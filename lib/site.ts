export const siteConfig = {
  name: "GuiTech Digital",
  description:
    "Serviços de informática, suporte técnico e soluções digitais para pessoas e empresas.",
  navigation: [
    { href: "/servicos", label: "Serviços" },
    { href: "/empresas", label: "Para empresas" },
    { href: "/cursos", label: "Cursos e materiais" },
    { href: "/portfolio", label: "Portfólio" },
  ],
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
} as const;

export function getWhatsAppUrl(message?: string): string | null {
  const number = siteConfig.whatsappNumber.replace(/\D/g, "");

  if (!number) {
    return null;
  }

  const params = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${params}`;
}
