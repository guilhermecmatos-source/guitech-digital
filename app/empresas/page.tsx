import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Soluções para empresas",
  description:
    "Conheça formatos possíveis de suporte técnico recorrente e soluções de informática para empresas.",
};

const supportModels = [
  {
    title: "Apoio sob demanda",
    description:
      "Solicitações pontuais avaliadas conforme o problema, a disponibilidade e o escopo necessário.",
  },
  {
    title: "Acompanhamento recorrente",
    description:
      "Possibilidade de combinar uma rotina de acompanhamento, prioridades e canais de contato para as necessidades da empresa.",
  },
  {
    title: "Projeto definido",
    description:
      "Planejamento e execução de uma iniciativa específica, com etapas, entregáveis e condições alinhados previamente.",
  },
];

export default function BusinessPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Para empresas</p>
          <h1>
            Tecnologia alinhada ao <span>dia a dia do negócio.</span>
          </h1>
          <p className="page-hero-copy">
            Suporte e soluções de informática podem assumir formatos diferentes. A primeira
            conversa ajuda a entender a operação antes de propor um caminho.
          </p>
        </div>
      </section>
      <section className="section section-muted">
        <div className="container">
          <SectionHeading
            eyebrow="Formatos possíveis"
            title="Um modelo para cada tipo de necessidade."
            description="As opções abaixo são pontos de partida para uma conversa, não planos ou condições comerciais publicados."
          />
          <div className="business-models">
            {supportModels.map((model, index) => (
              <article className="model-card" key={model.title}>
                <p className="eyebrow">0{index + 1}</p>
                <h3>{model.title}</h3>
                <p>{model.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container split-layout">
          <div className="split-copy">
            <p className="eyebrow">Como começar</p>
            <h2 className="section-heading-title">Uma conversa sobre sua operação.</h2>
            <p>
              Compartilhe o tamanho da necessidade, os sistemas ou equipamentos envolvidos e o
              resultado que sua equipe busca. A disponibilidade, o escopo e eventuais condições
              recorrentes serão confirmados diretamente, sem compromisso presumido.
            </p>
          </div>
          <div className="step-list">
            <article className="step-card">
              <span className="step-number">01</span>
              <div>
                <h3>Contexto e prioridades</h3>
                <p>Entendemos os desafios e o impacto na rotina.</p>
              </div>
            </article>
            <article className="step-card">
              <span className="step-number">02</span>
              <div>
                <h3>Escopo e formato</h3>
                <p>Alinhamos quais atividades fazem sentido e como conduzi-las.</p>
              </div>
            </article>
            <article className="step-card">
              <span className="step-number">03</span>
              <div>
                <h3>Proposta para avaliação</h3>
                <p>Condições e valores são apresentados após a avaliação do escopo.</p>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className="section section-muted">
        <div className="container">
          <div className="cta-panel">
            <div>
              <p className="eyebrow">Sua empresa</p>
              <h2>Vamos entender o que sua equipe precisa?</h2>
            </div>
            <Link className="button button-primary" href="/orcamento">
              Falar sobre minha empresa <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
