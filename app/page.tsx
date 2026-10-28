import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { Service, ServiceCard } from "@/components/service-card";
import { WhatsAppCta } from "@/components/whatsapp-cta";

const featuredServices: Service[] = [
  {
    number: "01",
    title: "Suporte e manutenção",
    description: "Ajuda para manter seus equipamentos funcionando com mais tranquilidade.",
    details: ["Diagnóstico e orientação", "Manutenção preventiva e corretiva"],
  },
  {
    number: "02",
    title: "Computadores e dispositivos",
    description: "Configuração, atualização e suporte para computadores e periféricos.",
    details: ["Instalação e configuração", "Desempenho e organização"],
  },
  {
    number: "03",
    title: "Redes e conectividade",
    description: "Apoio para redes locais e acesso confiável aos recursos digitais.",
    details: ["Configuração de rede", "Análise de conectividade"],
  },
];

const steps = [
  {
    number: "01",
    title: "Conte o que você precisa",
    description: "Envie os detalhes pelo formulário de orçamento.",
  },
  {
    number: "02",
    title: "Entenda as possibilidades",
    description: "A necessidade é analisada antes de definir uma proposta.",
  },
  {
    number: "03",
    title: "Combine os próximos passos",
    description: "Escopo, formato e condições são alinhados com transparência.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <p className="eyebrow">Tecnologia que aproxima</p>
            <h1>
              Seu dia a dia digital, <span>mais simples.</span>
            </h1>
            <p className="hero-copy">
              Serviços de informática e soluções digitais pensadas para pessoas e empresas.
              Conte o que você precisa e vamos encontrar o caminho.
            </p>
            <div className="hero-actions flex flex-wrap items-center gap-3.5">
              <Link className="button button-primary" href="/orcamento">
                Solicitar orçamento <span aria-hidden="true">→</span>
              </Link>
              <WhatsAppCta className="text-link" />
            </div>
            <p className="hero-note">
              <span className="status-dot" aria-hidden="true" />
              Atendimento a combinar conforme a necessidade
            </p>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="orbit" />
            <div className="tech-panel">
              <div className="panel-window">
                <span />
                <span />
                <span />
              </div>
              <p className="panel-label">GUItech / soluções digitais</p>
              <p className="panel-title">Tecnologia, sem complicação.</p>
              <div className="panel-rule" />
              <div className="panel-rule short" />
              <span className="panel-chip"> suporte · soluções · aprendizado </span>
            </div>
          </div>
        </div>
      </section>

      <div className="trust-strip">
        <div className="container trust-items">
          <div className="trust-item">
            <span aria-hidden="true">01</span> Conversa direta e clara
          </div>
          <div className="trust-item">
            <span aria-hidden="true">02</span> Soluções conforme sua necessidade
          </div>
          <div className="trust-item">
            <span aria-hidden="true">03</span> Escopo alinhado antes da proposta
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Como podemos ajudar"
            title="Tecnologia para seguir em frente."
            description="Apoio prático em informática e soluções digitais, com escopo combinado para cada necessidade."
          />
          <div className="service-grid">
            {featuredServices.map((service) => (
              <ServiceCard key={service.number} service={service} />
            ))}
          </div>
          <div className="section-action">
            <Link className="text-link" href="/servicos">
              Conheça todos os serviços <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container split-layout">
          <div className="split-copy">
            <p className="eyebrow">Um processo simples</p>
            <h2 className="section-heading-title">Do primeiro contato à solução, com clareza.</h2>
            <p>
              Cada projeto começa entendendo o contexto. Assim, a proposta pode refletir o que
              realmente importa para você, sem pacotes ou preços genéricos.
            </p>
            <Link className="button button-outline" href="/orcamento">
              Vamos conversar <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="step-list">
            {steps.map((step) => (
              <article className="step-card" key={step.number}>
                <span className="step-number">{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-panel">
            <div>
              <p className="eyebrow">O próximo passo começa aqui</p>
              <h2>Tem um desafio de tecnologia?</h2>
              <p>Conte um pouco sobre ele para receber um retorno alinhado à sua necessidade.</p>
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
