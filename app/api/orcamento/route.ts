import { checkRateLimit } from "@vercel/firewall";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 10_000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const MAX_TRACKED_CLIENTS = 5_000;
const allowedServices = new Set([
  "suporte",
  "computadores",
  "redes",
  "empresas",
  "outro",
]);
const serviceLabels: Record<string, string> = {
  suporte: "Suporte e manutenção",
  computadores: "Computadores e dispositivos",
  redes: "Redes e conectividade",
  empresas: "Soluções para empresas",
  outro: "Outro assunto",
};
const requestCounts = new Map<string, { count: number; resetAt: number }>();
let lastRateLimitCleanup = 0;

type BudgetRequest = {
  name: string;
  contact: string;
  service: string;
  description: string;
};

function isRateLimitedLocally(request: Request): boolean {
  const now = Date.now();

  if (now - lastRateLimitCleanup >= 60_000) {
    for (const [client, entry] of requestCounts) {
      if (entry.resetAt <= now) requestCounts.delete(client);
    }
    lastRateLimitCleanup = now;
  }

  const forwardedIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const clientIp = forwardedIp || request.headers.get("x-real-ip")?.trim() || "unknown";
  const entry = requestCounts.get(clientIp);

  if (entry && entry.resetAt > now) {
    if (entry.count >= RATE_LIMIT_MAX_REQUESTS) return true;
    entry.count += 1;
    return false;
  }

  if (requestCounts.size >= MAX_TRACKED_CLIENTS) return true;
  requestCounts.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  return false;
}

async function isRateLimited(request: Request): Promise<boolean> {
  if (process.env.VERCEL) {
    const result = await checkRateLimit("budget-form", {
      request,
      timeout: 1_000,
    });
    return result.rateLimited;
  }

  return isRateLimitedLocally(request);
}

async function readRequestBody(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();

  if (!reader) {
    throw new Error("empty_body");
  }

  const decoder = new TextDecoder();
  let body = "";
  let size = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new Error("body_too_large");
    }
    body += decoder.decode(value, { stream: true });
  }

  body += decoder.decode();
  return JSON.parse(body);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validateRequest(value: unknown): BudgetRequest | null {
  if (!isRecord(value)) return null;

  const { name, contact, service, description } = value;
  if (
    typeof name !== "string" ||
    typeof contact !== "string" ||
    typeof service !== "string" ||
    typeof description !== "string"
  ) {
    return null;
  }

  const cleaned = {
    name: name.trim(),
    contact: contact.trim(),
    service,
    description: description.trim(),
  };

  if (
    cleaned.name.length < 2 ||
    cleaned.name.length > 100 ||
    cleaned.contact.length < 5 ||
    cleaned.contact.length > 160 ||
    !allowedServices.has(cleaned.service) ||
    cleaned.description.length < 20 ||
    cleaned.description.length > 2000 ||
    /[\r\n]/.test(cleaned.contact)
  ) {
    return null;
  }

  return cleaned;
}

function hasAllowedOrigin(request: Request, origin: string): boolean {
  try {
    const requestUrl = new URL(request.url);
    const expectedHost =
      request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
      request.headers.get("host") ||
      requestUrl.host;
    const expectedProtocol =
      request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ||
      requestUrl.protocol.slice(0, -1);
    const originUrl = new URL(origin);

    return (
      origin === originUrl.origin &&
      originUrl.host === expectedHost &&
      originUrl.protocol === `${expectedProtocol}:`
    );
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && !hasAllowedOrigin(request, origin)) {
    return NextResponse.json({ message: "Origem da solicitação não permitida." }, { status: 403 });
  }

  const contentType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") {
    return NextResponse.json({ message: "Tipo de conteúdo não permitido." }, { status: 415 });
  }

  let rateLimited: boolean;
  try {
    rateLimited = await isRateLimited(request);
  } catch (error) {
    console.error("Rate limit check failed for the quote endpoint.", error);
    return NextResponse.json(
      { message: "Não foi possível validar a solicitação com segurança. Tente novamente mais tarde." },
      { status: 503 },
    );
  }

  if (rateLimited) {
    return NextResponse.json(
      { message: "Muitas solicitações. Aguarde antes de tentar novamente." },
      { status: 429 },
    );
  }

  let body: unknown;

  try {
    body = await readRequestBody(request);
  } catch (error) {
    const tooLarge = error instanceof Error && error.message === "body_too_large";
    return NextResponse.json(
      { message: tooLarge ? "A solicitação excede o limite permitido." : "Dados inválidos." },
      { status: tooLarge ? 413 : 400 },
    );
  }

  const budget = validateRequest(body);
  if (!budget) {
    return NextResponse.json(
      { message: "Revise os campos e tente novamente." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const destination = process.env.ORCAMENTO_EMAIL_DESTINO;
  const sender = process.env.ORCAMENTO_EMAIL_ORIGEM;

  if (!apiKey || !destination || !sender) {
    return NextResponse.json(
      {
        message:
          "O formulário ainda não está conectado para receber solicitações. Entre em contato mais tarde.",
      },
      { status: 503 },
    );
  }

  const contactIsEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(budget.contact);
  const emailText = [
    "Novo pedido de orçamento - GuiTech Digital",
    "",
    `Nome: ${budget.name}`,
    `Contato: ${budget.contact}`,
    `Serviço: ${serviceLabels[budget.service]}`,
    "",
    "Descrição:",
    budget.description,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [destination],
        ...(contactIsEmail ? { reply_to: budget.contact } : {}),
        subject: `Pedido de orçamento: ${serviceLabels[budget.service]}`,
        text: emailText,
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Não foi possível enviar sua solicitação agora. Tente novamente mais tarde." },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { message: "Não foi possível enviar sua solicitação agora. Tente novamente mais tarde." },
      { status: 502 },
    );
  }

  return NextResponse.json(
    { message: "Solicitação enviada. Obrigado pelo contato." },
    { status: 200 },
  );
}
