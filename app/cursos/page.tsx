import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Cursos e materiais",
  description:
    "Área demonstrativa preparada para futuros cursos e materiais digitais da GuiTech Digital.",
  alternates: {
    canonical: "/cursos",
  },
};

const examples = [
  {
    category: "Exemplo de curso",
    title: "Fundamentos de informática",
    description:
      "Uma possível trilha introdutória sobre conceitos e ferramentas do dia a dia digital.",
  },
  {
    category: "Exemplo de material",
    title: "Guia de organização digital",
    description:
      "Uma ideia de material educativo para organizar arquivos, rotinas e ferramentas.",
  },
  {
    category: "Exemplo de oficina",
    title: "Tecnologia para pequenos negócios",
    description:
      "Um formato possível para conversar sobre ferramentas digitais úteis na rotina de uma empresa.",
  },
];

export default function CoursesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Cursos e materiais</p>
          <h1>
            Aprender tecnologia pode ser <span>mais acessível.</span>
          </h1>
          <p className="page-hero-copy">
            Este espaço está preparado para reunir conteúdos e iniciativas de aprendizado. Os
            cartões abaixo são apenas exemplos de formato.
          </p>
        </div>
      </section>
      <section className="section section-muted">
        <div className="container">
          <SectionHeading
            eyebrow="Estrutura demonstrativa"
            title="Conteúdos que poderão estar por aqui."
            description="As ideias abaixo não estão disponíveis para compra, inscrição ou acesso. Nenhum curso ou produto digital está sendo ofertado nesta página."
          />
          <div className="content-grid">
            {examples.map((example) => (
              <article className="content-card" key={example.title}>
                <span className="tag">{example.category}</span>
                <h3>{example.title}</h3>
                <p>{example.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="cta-panel">
            <div>
              <p className="eyebrow">Fale com a gente</p>
              <h2>Tem uma necessidade de aprendizado específica?</h2>
              <p>Use o formulário para compartilhar sua ideia ou necessidade.</p>
            </div>
            <Link className="button button-primary" href="/orcamento">
              Entrar em contato <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
