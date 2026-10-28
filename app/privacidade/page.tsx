import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso de privacidade",
  description: "Informações sobre o tratamento dos dados enviados à GuiTech Digital.",
};

const pendingInformation = [
  "Identificação do controlador: razão social ou nome completo e, se aplicável, CNPJ.",
  "Canal de contato para assuntos de privacidade e exercício de direitos.",
  "Base legal aplicável ao atendimento dos pedidos, definida pelo controlador.",
  "Prazo de retenção do e-mail recebido e critérios para eliminação.",
  "Localização, transferências internacionais e prazos de retenção do Resend e da caixa de e-mail.",
];

export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Privacidade</p>
          <h1>
            Aviso de <span>privacidade</span>
          </h1>
          <p className="page-hero-copy">
            Informações sobre os dados enviados pelo formulário de orçamento da GuiTech Digital.
          </p>
        </div>
      </section>
      <section className="container privacy-content">
        <div className="privacy-draft-notice" role="note">
          <strong>Configuração pendente antes da divulgação do formulário.</strong>
          <p>
            Este aviso descreve o fluxo técnico atual, mas precisa ser completado e revisado pelo
            responsável pelo negócio. Os dados identificados abaixo não foram presumidos.
          </p>
        </div>
        <div className="service-detail-grid privacy-grid">
          <article className="service-detail">
            <h2>Dados e finalidade</h2>
            <p>
              O formulário solicita nome, contato, tipo de serviço e descrição para receber e
              responder a pedidos de orçamento. Não inclua senhas ou informações sensíveis.
            </p>
          </article>
          <article className="service-detail">
            <h2>Como os dados são encaminhados</h2>
            <p>
              O site não mantém banco próprio de pedidos. Quando configurado, o conteúdo é enviado
              ao Resend para entrega ao endereço de e-mail definido pelo responsável. O provedor
              de hospedagem também processa dados técnicos da requisição. Os dados podem permanecer
              nos serviços de e-mail envolvidos conforme suas configurações e políticas.
            </p>
          </article>
          <article className="service-detail">
            <h2>Responsável e contato</h2>
            <p>
              Controlador: [INFORMAR NOME COMPLETO OU RAZÃO SOCIAL E, SE APLICÁVEL, CNPJ].
              <br />
              Contato de privacidade: [INFORMAR E-MAIL OU CANAL DE CONTATO].
            </p>
          </article>
          <article className="service-detail">
            <h2>Base legal e retenção</h2>
            <p>
              Base legal aplicável: [DEFINIR COM O RESPONSÁVEL PELO TRATAMENTO].
              <br />
              Prazo e critérios de retenção/eliminação: [DEFINIR PARA A CAIXA DE E-MAIL E OS
              PROVEDORES ENVOLVIDOS].
            </p>
          </article>
          <article className="service-detail">
            <h2>Provedores e transferências</h2>
            <p>
              Antes da publicação, confirmar as condições, localização do tratamento e retenção
              aplicáveis ao Resend, ao provedor da caixa de e-mail e à hospedagem Netlify, inclusive
              eventual transferência internacional de dados.
            </p>
          </article>
          <article className="service-detail">
            <h2>Direitos e solicitações</h2>
            <p>
              Para orientar solicitações dos titulares, informe o canal de privacidade acima e
              complete este aviso com o procedimento e as informações aplicáveis aos direitos
              previstos na legislação de proteção de dados.
            </p>
          </article>
        </div>
        <div className="service-detail privacy-pending">
          <h2>Informações que faltam para finalizar este aviso</h2>
          <ul className="check-list">
            {pendingInformation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
