import Link from "next/link";
import { getWhatsAppUrl } from "@/lib/site";

type WhatsAppCtaProps = {
  className?: string;
};

export function WhatsAppCta({ className = "" }: WhatsAppCtaProps) {
  const href = getWhatsAppUrl("Olá! Gostaria de conversar sobre os serviços da GuiTech Digital.");

  if (!href) {
    return (
      <Link className={`whatsapp-not-configured ${className}`} href="/orcamento">
        WhatsApp ainda não configurado · use o formulário
      </Link>
    );
  }

  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      Conversar pelo WhatsApp <span aria-hidden="true">↗</span>
    </a>
  );
}
