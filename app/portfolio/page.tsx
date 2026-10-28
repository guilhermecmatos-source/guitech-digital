import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portfólio",
  description:
    "Espaço preparado para apresentar projetos reais da GuiTech Digital, com autorização.",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Portfólio</p>
          <h1>
            Projetos reais, apresentados com <span>contexto.</span>
          </h1>
          <p className="page-hero-copy">
            Esta área está preparada para receber trabalhos concluídos quando houver projetos
            autorizados para divulgação.
          </p>
        </div>
      </section>
      <section className="section section-muted">
        <div className="container">
          <div className="portfolio-empty">
            <span className="tag">Em preparação</span>
            <h2>Os projetos serão publicados aqui.</h2>
            <p>
              Ainda não há projetos ou depoimentos publicados. Nenhum cliente ou resultado é
              apresentado como referência sem autorização.
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="cta-panel">
            <div>
              <p className="eyebrow">Vamos conversar</p>
              <h2>Seu projeto pode começar com uma boa conversa.</h2>
            </div>
            <Link className="button button-primary" href="/orcamento">
              Solicitar orçamento <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
