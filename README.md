# GuiTech Digital

Site profissional para apresentar serviços de informática, soluções para empresas e receber pedidos de orçamento. A base usa Next.js App Router, TypeScript e Tailwind CSS.

## Requisitos

- Node.js 20.9 ou superior
- npm

## Executar localmente

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

Abra `http://localhost:3000`. Os comandos `npm run build`, `npm run start` e `npm run typecheck` fazem a compilação, iniciam a versão compilada e verificam os tipos, respectivamente.

## Configuração antes de publicar

- **WhatsApp:** defina `NEXT_PUBLIC_WHATSAPP_NUMBER` como número oficial, com código do país e somente dígitos. Enquanto estiver vazio, o site informa que o canal ainda não foi configurado.
- **Pedidos de orçamento:** configure `RESEND_API_KEY`, `ORCAMENTO_EMAIL_DESTINO` e `ORCAMENTO_EMAIL_ORIGEM` no ambiente de produção. A origem precisa estar autorizada/verificada no Resend. Sem essas variáveis, a API responde que o envio não está ativo; nenhum pedido é armazenado.
- Use variáveis de ambiente do provedor de hospedagem para segredos; nunca publique `.env.local` ou a chave de API.
- Revise textos, política de privacidade, domínio e metadados para refletir os dados comerciais reais antes da publicação.

## Publicação

Hospede em uma plataforma compatível com Next.js (por exemplo, Vercel ou outro provedor Node.js), configure as três variáveis de e-mail e o número oficial do WhatsApp no ambiente de produção e valide o domínio de envio no Resend. Configure domínio e HTTPS, monitore erros da integração sem registrar o conteúdo dos formulários e considere proteção contra abuso/rate limiting no provedor de hospedagem ou no serviço de envio antes de divulgar publicamente o formulário.

Cursos e materiais na página correspondente são exemplos de estrutura, não ofertas disponíveis. A área de portfólio está preparada para receber projetos reais com autorização.
