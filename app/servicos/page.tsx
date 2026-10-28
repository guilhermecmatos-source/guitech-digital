import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Serviços de informática",
  description:
    "Conheça os serviços de suporte técnico, manutenção, computadores, redes e soluções digitais da GuiTech Digital.",
};

const services = [
  {
    title: "Suporte técnico",
    description:
      "Diagnóstico e orientação para dificuldades com computadores, sistemas e dispositivos, com escopo definido após entender o caso.",
  },
  {
    title: "Manutenção de computadores",
    description:
      "Apoio em manutenção preventiva e corretiva, configuração, atualização e organização de equipamentos.",
  },
  {
    title: "Instalação e configuração",
    description:
      "Configuração de sistemas, programas e periféricos conforme os requisitos e licenças aplicáveis.",
  },
  {
    title: "Redes e conectividade",
    description:
      "Análise e configuração de redes locais e conectividade, considerando o ambiente disponível.",
  },
  {
    title: "Soluções digitais",
    description:
      "Apoio para organizar necessidades digitais e avaliar soluções viáveis para o contexto de cada pessoa ou empresa.",
  },
  {
    title: "Orientação e aprendizado",
    description:
      "Acompanhamento para entender ferramentas e boas práticas digitais no ritmo e no contexto de quem solicita.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Serviços</p>
          <h1>
            Apoio técnico que <span>faz sentido para você.</span>
          </h1>
          <p className="page-hero-copy">
            Soluções de informática com escopo e formato definidos a partir de uma conversa sobre
            a sua necessidade.
          </p>
        </div>
      </section>
      <section className="section section-muted">
        <div className="container service-detail-grid">
          {services.map((service, index) => (
            <article className="service-detail" key={service.title}>
              <p className="eyebrow">0{index + 1}</p>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Atendimento sob consulta"
            title="Cada contexto é diferente."
            description="O orçamento considera o escopo, o formato de atendimento e os recursos necessários. Nenhum valor é presumido antes dessa avaliação."
          />
          <Link className="button button-primary" href="/orcamento">
            Descrever minha necessidade <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
