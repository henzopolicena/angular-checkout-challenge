# Especificação

## 1. Objetivo

Desenvolver um checkout responsivo em Angular, utilizando Tailwind CSS 4, com três telas: pagamento, sucesso e erro.

A aplicação é exclusivamente demonstrativa. Não haverá pagamentos reais nem backend.

O produto simulado é o **Nexo Pro**: plano mensal, 1 usuário, R$ 79,90.

## 2. Tecnologias

- Angular 22, com componentes standalone.
- Tailwind CSS 4.
- TypeScript.
- Angular Router.
- Signal Forms (`@angular/forms/signals`).
- Signals para o estado compartilhado.

Não utilizar NgRx, Bootstrap, bibliotecas externas de componentes ou gerenciamento de estado.

O documento HTML deve usar `lang="pt-BR"`. A interface e a documentação são em português brasileiro.

## 3. Referência visual

A implementação deve ser pixel-perfect contra as composições em `public/design/`:

- [`public/design/checkout-credit.png`](../public/design/checkout-credit.png) — checkout com cartão de crédito, desktop e mobile.
- [`public/design/success.png`](../public/design/success.png) — pagamento confirmado, desktop e mobile.
- [`public/design/error.png`](../public/design/error.png) — falha de pagamento, desktop e mobile.
- [`public/design/payment-states.png`](../public/design/payment-states.png) — Pix, validação de campos e processamento.

## 4. Interface compartilhada

Cabeçalho e rodapé existem uma vez no shell `Guest` (funil de conversão). O indicador de etapas existe uma vez no host do checkout. As três telas só renderizam o miolo. O stepper não é um mapa de rotas: Pedido não é tela; pagamento e erro usam o passo Pagamento; sucesso usa Confirmação. Não há layout autenticado: o checkout é um funil guest isolado.

A interface deve incluir:

- Cabeçalho com a marca **nexo** e o selo “Checkout seguro”.
- Indicador de etapas: Pedido, Pagamento e Confirmação. “Pedido” não é rota nem tela: no checkout e no erro aparece como etapa já concluída; no sucesso, as três etapas aparecem concluídas.
- Resumo do pedido.
- Rodapé com “© 2026 Nexo. Todos os direitos reservados.” e os rótulos “Precisa de ajuda?”, “Privacidade” e “Termos”. Esses rótulos e o texto “Fale com a gente” não navegam para páginas reais.
- Layout desktop em duas colunas no checkout; no mobile, o resumo do pedido vem primeiro.

### Resumo do pedido

- Nome: Nexo Pro.
- Plano mensal · 1 usuário.
- Benefícios: projetos e tarefas ilimitados; relatórios e automações; suporte prioritário.
- Subtotal: R$ 79,90.
- Taxas: R$ 0,00.
- Total hoje: R$ 79,90.
- Nota: renovação mensal, cancelamento sem taxas adicionais.
- Nota de proteção: pagamento criptografado; a aplicação não armazena os dados do cartão.

## 5. Tela de pagamento

Título: “Finalize sua assinatura”. Subtítulo: “Falta só um passo para começar com o Nexo Pro.”

Disponibilizar três meios de pagamento:

- **Cartão de crédito:** número, nome no cartão, validade e CVV.
- **Cartão de débito:** mesmos campos, validações, mensagens e cartões de teste do crédito.
- **Pix:** QR Code e código fictícios, com opção de copiar e concluir a simulação.

O formulário **não** abre preenchido. O estado preenchido das composições ilustra o formulário válido, não o estado inicial.

Com o cartão válido, exibir o selo “Dados do cartão preenchidos”. O botão de envio usa o texto “Pagar R$ 79,90”. Abaixo dele: “Ao continuar, você concorda com os Termos de uso e a Política de privacidade.”

### Validações do cartão

- Número válido pelo algoritmo de Luhn.
- Bandeiras suportadas: Visa (inicia em `4`) e Mastercard (`51–55` ou `2221–2720`). Número com Luhn válido fora dessas bandeiras é inválido.
- Nome do titular obrigatório, com pelo menos duas palavras, como aparece no cartão.
- Validade no formato `MM/AA` e não vencida.
- CVV com 3 ou 4 dígitos.

Mensagens de erro, alinhadas à referência:

- Número: “Número inválido. Confira os dígitos do cartão.”
- Nome: “Nome incompleto” e “Informe o nome como aparece no cartão.”
- Validade: “Cartão vencido.”
- CVV: “Use 3 ou 4 dígitos.”
- Resumo do formulário: “Corrija os campos destacados para continuar.”

Campos inválidos usam borda e texto vermelhos; campos válidos usam destaque verde. Impedir o envio até que o formulário esteja válido.

### Pix

- Instrução: “Pague com seu app do banco”.
- QR Code estático/fictício, sem biblioteca extra.
- Código copia e cola: `000201.NEXO-PRO.7990.DEMO`.
- Ação “Copiar código Pix”, usando `navigator.clipboard`, com fallback visível se a cópia falhar.
- Ação “Concluir pagamento”, que inicia a simulação somente após essa confirmação explícita.

### Processamento

O estado `processing` ocorre na própria rota `/checkout`, no card “Processando seu pagamento”. Não é tela nem rota nova.

Textos da referência: “Estamos aguardando a confirmação. Isso pode levar alguns segundos.”, “Aguarde a confirmação” e “Não feche esta página nem envie o pagamento novamente.”

Simular aproximadamente 1.200 ms, impedir envios duplicados e, ao terminar, navegar para sucesso ou erro.

## 6. Simulação de pagamento

Os resultados devem ser determinísticos:

- `4242 4242 4242 4242`: aprovado.
- `4000 0000 0000 0002`: recusado, com o motivo “Cartão não autorizado”.
- Outros cartões válidos das bandeiras suportadas: aprovados.
- Pix: aprovado após o usuário selecionar explicitamente “Concluir pagamento”.

Nenhuma cobrança ou transação real será realizada.

## 7. Telas de resultado

### Sucesso

- Título: “Pagamento confirmado!”
- Confirmação de assinatura ativa, sem alegar que uma conta real existe.
- Resumo: Nexo Pro; pedido `#NX-10482`; meio usado (ex.: Crédito · Visa •••• 4242); data e hora fictícias da tentativa; total pago R$ 79,90.
- Nota de recibo para `marina.almeida@exemplo.com`.
- Próxima renovação fictícia no mês seguinte à data exibida.
- Ações “Acessar meu espaço” e “Ver recibo”: feedback simulado na própria tela, sem nova rota e sem alegar que uma conta ou recibo real existe.

### Erro

- Título: “Não foi possível concluir o pagamento”.
- Informar que nenhuma cobrança foi realizada e que o pedido continua reservado na simulação.
- Alerta: “Cartão não autorizado”. Texto de apoio: o banco recusou a transação; conferir dados e limite ou usar outro meio.
- Resumo da tentativa: pedido `#NX-10482`, meio usado, total a pagar R$ 79,90.
- “Tentar novamente”: volta para `/checkout` mantendo o meio selecionado.
- “Escolher outro meio”: volta para `/checkout` e limpa a seleção do meio.
- Texto de apoio: é possível pagar com outro cartão ou escolher Pix.

## 8. Rotas e estado

Utilizar as rotas, com o shell `Guest`, o host do checkout e filhos:

- `/` redireciona para `/checkout`.
- `/checkout`
- `/checkout/success`
- `/checkout/error`

As rotas de resultado exigem um resultado válido em memória. Acesso direto ou atualização sem estado válido deve redirecionar para `/checkout`.

O estado deve distinguir `idle`, `processing`, `success` e `error`. O status `processing` permanece na página de checkout.

O estado compartilhado pode guardar meio de pagamento, bandeira, últimos 4 dígitos, valor, identificador `#NX-10482`, e-mail fictício e status. Não persistir o número completo do cartão ou CVV em serviços compartilhados, armazenamento do navegador, rotas ou logs.

## 9. Qualidade

- Seguir os princípios de acessibilidade da WCAG 2.2 AA.
- Garantir responsividade e navegação por teclado.
- Conferir pixel-perfect contra as quatro composições em `public/design/`.
- Confirmar que o build de produção funciona e que o console não apresenta erros relevantes.
- Registrar limitações e instruções de execução no README.

Não serão implementados testes automatizados unitários ou end-to-end.

### Matriz de verificações manuais

Executar e registrar o resultado de cada item no Marco 6:

1. Checkout desktop e mobile pixel-perfect contra `checkout-credit.png`.
2. Formulário de crédito: válido, inválido, Luhn, bandeira, validade, CVV e nome.
3. Débito usa os mesmos campos, validações e cartões de teste.
4. Pix: QR, código, copiar, fallback e “Concluir pagamento”.
5. Cartão `4242 4242 4242 4242` leva a sucesso após o processamento na própria `/checkout`.
6. Cartão `4000 0000 0000 0002` leva a erro com “Cartão não autorizado”.
7. Tela de sucesso pixel-perfect contra `success.png`; ações simuladas sem nova rota.
8. Tela de erro pixel-perfect contra `error.png`; “Tentar novamente” e “Escolher outro meio”.
9. Acesso direto ou atualização de `/checkout/success` e `/checkout/error` sem estado redireciona para `/checkout`.
10. `/` redireciona para `/checkout`.
11. Não é possível enviar o formulário inválido nem duplicar envio durante `processing`.
12. Navegação por teclado e revisão WCAG 2.2 AA.
13. Build de produção passa; console sem erros relevantes.

## 10. Critérios de conclusão

- As três telas estão implementadas pixel-perfect contra `public/design/`.
- Cartão e Pix seguem os comportamentos especificados.
- Validações, processamento e navegação funcionam.
- A interface é responsiva e foi revisada quanto à acessibilidade.
- O build de produção passa.
- A documentação corresponde ao comportamento real da aplicação.
