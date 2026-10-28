import type { Metadata } from "next";
import { BudgetForm } from "@/components/budget-form";

export const metadata: Metadata = {
  title: "Solicitar orçamento",
  description:
    "Conte à GuiTech Digital sobre sua necessidade de informática e solicite uma avaliação.",
};

export default function BudgetPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Solicitar orçamento</p>
          <h1>
            Vamos conversar sobre <span>o que você precisa?</span>
          </h1>
          <p className="page-hero-copy">
            Envie alguns detalhes para que a necessidade possa ser avaliada. O escopo e as
            condições são combinados depois do primeiro contato.
          </p>
        </div>
      </section>
      <section className="container budget-layout">
        <aside className="budget-aside">
          <p className="eyebrow">Próximos passos</p>
          <h2>Um pedido simples para começar.</h2>
          <p>
            Informe um contato e descreva sua necessidade. As informações serão usadas somente
            para responder a esta solicitação e não ficam armazenadas pelo site.
          </p>
          <ul className="check-list">
            <li>Explique o contexto com suas palavras</li>
            <li>Não inclua senhas ou dados sensíveis</li>
            <li>Valores e disponibilidade serão confirmados depois</li>
          </ul>
        </aside>
        <BudgetForm />
      </section>
    </>
  );
}
