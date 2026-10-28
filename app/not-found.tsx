import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="eyebrow">404 · Página não encontrada</p>
        <h1>
          Este caminho <span>não existe.</span>
        </h1>
        <p className="page-hero-copy">Volte ao início ou fale conosco sobre o que precisa.</p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/">
            Ir para o início
          </Link>
          <Link className="button button-outline" href="/orcamento">
            Solicitar orçamento
          </Link>
        </div>
      </div>
    </section>
  );
}
