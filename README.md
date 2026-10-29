# GuiTech Digital

Site profissional para apresentar serviços de informática, soluções para empresas e receber pedidos de orçamento. A base usa Next.js App Router, TypeScript e Tailwind CSS.

## Requisitos

- Node.js 22.12 ou superior
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
- **Origem do site:** configure `SITE_ORIGIN` como a origem canônica exata, sem caminho ou barra final (por exemplo, `https://www.seudominio.com`). Configure também a origem dos deploy previews usada nos testes. A API não confia em cabeçalhos de host encaminhados pelo cliente.
- **Pedidos de orçamento:** configure `RESEND_API_KEY`, `ORCAMENTO_EMAIL_DESTINO` e `ORCAMENTO_EMAIL_ORIGEM` no ambiente de produção. A origem precisa estar autorizada/verificada no Resend. Sem essas variáveis, a API responde que o envio não está ativo; nenhum pedido é armazenado em banco próprio.
- Na Netlify, confirme que as variáveis estão disponíveis no contexto do deploy publicado e, se o painel oferecer escopos, inclua **Functions**. Alterações nas variáveis só chegam às funções após um novo deploy. Se a função responder 503 por configuração, o log informa somente a etapa ou os nomes ausentes; nunca registra valores secretos nem dados do formulário.
- Sem domínio próprio verificado no Resend, `onboarding@resend.dev` é apenas para testes e o destinatário precisa ser o endereço da conta Resend. Enviar para outros destinatários exige domínio verificado; uma rejeição do Resend aparece como erro 502 no formulário, não como erro de configuração 503.
- Use variáveis de ambiente do provedor de hospedagem para segredos; nunca publique `.env.local` ou a chave de API.
- A página `/privacidade` é um rascunho operacional. Complete os campos pendentes com dados reais e revise o aviso antes de receber solicitações.
- Revise domínio e metadados para refletir os dados comerciais reais antes da publicação.

## Publicação

O projeto usa Next.js App Router e o adaptador OpenNext mantido pela Netlify. Conecte o repositório GitHub à Netlify, configure Node.js 22.12 ou superior, use `npm run build` como comando de build e deixe a Netlify detectar o framework/adaptador. A Edge Function `netlify/edge-functions/orcamento-rate-limit.ts` limita `POST /api/orcamento` a 2 solicitações por 180 segundos, agregadas por IP e domínio, e encaminha os pedidos permitidos ao Route Handler do Next.js sem consumir nem recriar o corpo.

O rate limiting básico por IP está disponível no plano Netlify Free. A proteção é aproximada: a documentação informa que o bloqueio pode levar até 10 segundos para começar e que o limite por IP/domínio não impõe um teto global compartilhado entre todos os visitantes. Após cada deploy preview, confira no log de pós-processamento se a regra foi aceita e teste uma resposta 429; uma regra inválida pode não falhar o deploy. Não considere o teste local como comprovação da proteção na infraestrutura Netlify.

O plano Free informa 300 créditos mensais com hard limit; ao esgotar o saldo, os projetos da equipe são pausados. A tabela atual contabiliza 15 créditos por deploy de produção, 10 por GB-hora de compute, 20 por GB de banda e 2 por 10 mil solicitações. Acompanhe o consumo e não habilite upgrade ou recarga automática sem autorização. Confirme que as condições do plano permitem o uso comercial pretendido antes de conectar o domínio de produção.

Configure as variáveis de ambiente na Netlify para deploy previews e produção, valide o domínio HTTPS e o remetente no Resend e teste o envio real controlado antes de divulgar o formulário. O Resend Free atualmente anuncia 3.000 emails/mês, limitado a 100 por dia. Não registre o conteúdo pessoal dos pedidos em logs.

Cursos e materiais na página correspondente são exemplos de estrutura, não ofertas disponíveis. A área de portfólio está preparada para receber projetos reais com autorização.
