import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { WhatsAppCta } from "@/components/whatsapp-cta";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand footer-brand" href="/">
            <span className="brand-mark" aria-hidden="true">
              G<span>.</span>
            </span>
            <span className="brand-name">GuiTech Digital</span>
          </Link>
          <p className="footer-copy">{siteConfig.description}</p>
        </div>
        <div className="footer-links">
          <span className="eyebrow">Explore</span>
          <Link href="/servicos">Serviços</Link>
          <Link href="/empresas">Soluções para empresas</Link>
          <Link href="/cursos">Cursos e materiais</Link>
          <Link href="/portfolio">Portfólio</Link>
        </div>
        <div className="footer-links">
          <span className="eyebrow">Vamos conversar?</span>
          <Link href="/orcamento">Solicitar orçamento</Link>
          <WhatsAppCta />
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} GuiTech Digital</span>
        <span>Informação clara. Tecnologia com propósito.</span>
      </div>
    </footer>
  );
}
