import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 10_000;
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

type BudgetRequest = {
  name: string;
  contact: string;
  service: string;
  description: string;
};

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

function getCanonicalOrigin(): string | null {
  const configuredOrigin = process.env.SITE_ORIGIN?.trim();
  if (!configuredOrigin) return null;

  try {
    const url = new URL(configuredOrigin);

    return url.origin === configuredOrigin && (url.protocol === "https:" || url.protocol === "http:")
      ? url.origin
      : null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const canonicalOrigin = getCanonicalOrigin();
  if (!canonicalOrigin) {
    console.error("Quote form configuration check failed.", {
      check: process.env.SITE_ORIGIN?.trim() ? "site_origin_invalid" : "site_origin_missing",
    });
    return NextResponse.json(
      { message: "O formulário ainda não está configurado para receber solicitações." },
      { status: 503 },
    );
  }

  const origin = request.headers.get("origin");
  if (!origin || origin !== canonicalOrigin) {
    return NextResponse.json({ message: "Origem da solicitação não permitida." }, { status: 403 });
  }

  const contentType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") {
    return NextResponse.json({ message: "Tipo de conteúdo não permitido." }, { status: 415 });
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

  if (
    isRecord(body) &&
    body.website !== undefined &&
    (typeof body.website !== "string" || body.website.trim() !== "")
  ) {
    return NextResponse.json({ message: "Dados inválidos." }, { status: 400 });
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
  const missingEmailConfiguration = [
    ["RESEND_API_KEY", apiKey],
    ["ORCAMENTO_EMAIL_DESTINO", destination],
    ["ORCAMENTO_EMAIL_ORIGEM", sender],
  ]
    .filter(([, value]) => !value?.trim())
    .map(([name]) => name);

  if (missingEmailConfiguration.length > 0) {
    console.error("Quote form configuration check failed.", {
      check: "resend_environment",
      missingVariables: missingEmailConfiguration,
    });
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
      console.error("Quote form delivery failed.", {
        check: "resend_api",
        status: response.status,
      });
      return NextResponse.json(
        { message: "Não foi possível enviar sua solicitação agora. Tente novamente mais tarde." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Quote form delivery request failed.", {
      check: "resend_request",
      reason: error instanceof Error && error.name === "TimeoutError" ? "timeout" : "request_error",
    });
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
