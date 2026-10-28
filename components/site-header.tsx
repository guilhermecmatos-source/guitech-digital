import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-content">
        <Link className="brand" href="/" aria-label="GuiTech Digital, início">
          <span className="brand-mark" aria-hidden="true">
            G<span>.</span>
          </span>
          <span className="brand-name">GuiTech Digital</span>
        </Link>
        <nav className="main-nav" aria-label="Navegação principal">
          {siteConfig.navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="button button-small button-outline header-cta" href="/orcamento">
          Solicitar orçamento
        </Link>
      </div>
    </header>
  );
}
