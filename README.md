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

Hospede na Vercel, configure as três variáveis de e-mail e o número oficial do WhatsApp no ambiente de produção e valide o domínio de envio no Resend. Antes de divulgar o formulário, crie e publique uma regra no projeto Vercel Firewall para `POST /api/orcamento`, com identificador de rate limit `budget-form`, limite de 10 solicitações por 15 minutos e ação padrão 429. O endpoint usa o IP de origem e o contador do Vercel Firewall em produção; se a checagem falhar, o envio é interrompido. Os contadores do Firewall são por região, portanto o limite efetivo pode ser maior para tráfego distribuído entre regiões. Fora da Vercel, permanece apenas o limitador local por processo (defesa em profundidade), que não é suficiente como controle de produção em múltiplas instâncias. Configure domínio e HTTPS, monitore erros da integração sem registrar o conteúdo dos formulários e verifique a regra publicada antes de abrir o formulário ao público.

Cursos e materiais na página correspondente são exemplos de estrutura, não ofertas disponíveis. A área de portfólio está preparada para receber projetos reais com autorização.
