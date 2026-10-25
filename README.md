# Angular Checkout Challenge

Checkout frontend da **Nexo** para o plano **Nexo Pro** (mensal, 1 usuário, R$ 79,90). Foi desenvolvido com Angular 22 e Tailwind CSS 4 como desafio técnico.

A aplicação está implementada e pronta para avaliação. Pagamentos, recibo, conta e renovação são simulados no navegador.

## Objetivo

Oferecer um funil de checkout responsivo, com validação de cartão (Signal Forms), três meios de pagamento simulados (crédito, débito e Pix) e telas de sucesso e erro. O checkout é um funil guest isolado: não há área autenticada neste repositório.

## Tecnologias

Versões confirmadas no `package.json`:

- Angular 22.2 (`@angular/core` ^22.2.0, CLI ^22.2.4)
- TypeScript ~6.0.2
- Tailwind CSS 4.3.3
- Angular Router
- Signal Forms (`@angular/forms/signals`)
- Angular Signals
- Lucide (`@lucide/angular` ^1.61.0)

Não há NgRx, Bootstrap, kit de UI, backend nem pasta de interfaces. O Prettier (^3.8.1) entra só como formatação. RxJS permanece como dependência do Angular, não como estado da aplicação.

## Pré-requisitos

- Node.js 20.19+ ou 22.12+ (requisito do Angular 22)
- npm

## Como executar

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm start
```

O script `start` executa `ng serve`. Acesse [http://localhost:4200](http://localhost:4200). A rota `/` redireciona para `/checkout`.

Também é possível usar `npx ng serve`.

## Build de produção

```bash
npm run build
```

O script `build` executa `ng build`. Em `angular.json`, a configuração padrão do build é `production`. A saída fica em `dist/angular-checkout-challenge`.

Também é possível usar `npx ng build`.

## Rotas

| Rota | Comportamento |
| --- | --- |
| `/` | Redireciona para `/checkout`. |
| `/checkout` | Pagamento: resumo, meios, formulário ou Pix, e o painel de processamento. |
| `/checkout/success` | Resultado aprovado. Exige `status === 'success'` em memória (`CanActivate`). |
| `/checkout/error` | Resultado recusado. Exige `status === 'error'` em memória (`CanActivate`). |

O estado vive só na memória (`CheckoutStore`). Recarregar `/checkout/success` ou `/checkout/error` sem esse estado redireciona para `/checkout`.

O passo **Pedido** do indicador de etapas não é rota. Pagamento e erro usam o passo Pagamento; sucesso usa Confirmação.

## Fluxo de pagamento

O checkout abre com **crédito** selecionado e os campos vazios.

### Crédito e débito

Mesmos campos (número, nome, validade, CVV), mesmas validações e os mesmos cartões de teste. Débito só troca o título do fieldset para “Cartão de débito”.

Validações: Luhn; bandeira Visa (inicia em `4`) ou Mastercard (`51–55` ou `2221–2720`); nome com pelo menos duas palavras; validade `MM/AA` não vencida; CVV com 3 ou 4 dígitos. O botão **Pagar R$ 79,90** fica desabilitado enquanto o formulário for inválido.

Ao pagar, a própria `/checkout` mostra “Processando seu pagamento” por cerca de 1.200 ms. Envios duplicados são ignorados. Em seguida a aplicação navega para sucesso ou erro.

O número completo do cartão e o CVV não entram no store, no armazenamento do navegador, nas rotas nem em logs. Só bandeira e os últimos 4 dígitos seguem para o resultado.

### Pix

QR Code estático (`pix-qr.svg`), código copia e cola `000201.NEXO-PRO.7990.DEMO`, botão **Copiar código Pix** (`navigator.clipboard`, com mensagem se a cópia falhar) e **Concluir pagamento**. A simulação só começa depois dessa confirmação e sempre aprova.

### Cartões de teste

Determinísticos, implementados em `src/app/core/services/payment-simulator.ts`:

- `4242 4242 4242 4242` — aprovado (Visa).
- `4000 0000 0000 0002` — recusado, motivo “Cartão não autorizado”.
- Outros números válidos de Visa ou Mastercard — aprovados.
- Pix — aprovado após **Concluir pagamento**.

Use só esses dados fictícios. Não informe cartão real.

### Depois do resultado

- **Tentar novamente:** volta a `/checkout` com o mesmo meio, campos vazios.
- **Escolher outro meio:** volta a `/checkout` sem meio selecionado.
- **Acessar meu espaço** / **Ver recibo:** avisos na própria tela de sucesso, sem nova rota.

## Estrutura

`src/app` usa camadas típicas de uma aplicação Angular, com aliases `@core/*`, `@shared/*`, `@layout/*` e `@features/*`:

```text
src/app/
  core/          catálogo Nexo Pro, PaymentSimulator, checkoutResultGuard
  shared/        CheckoutSnapshot e util de cartão (Luhn, bandeira, máscaras)
  layout/guest/  header e footer do funil de conversão
  features/checkout/
                 CheckoutStore, pagamento, sucesso, erro e UI do funil
```

Detalhes em [`docs/architecture.md`](docs/architecture.md).

## Validação manual

Não há testes automatizados no projeto (`npm test` e `tsconfig.spec.json` são resíduo do CLI e não devem ser usados).

1. `npm start` e percorrer a matriz de verificações manuais em [`docs/specification.md`](docs/specification.md) (seção 9).
2. `npm run build` para confirmar o empacotamento de produção.

As telas de referência estão em [`public/design/`](public/design/).

## Documentação

- [`docs/specification.md`](docs/specification.md) — requisitos, fluxos e matriz manual.
- [`docs/architecture.md`](docs/architecture.md) — pastas, estado, rotas e limitações técnicas.
- [`docs/decisions.md`](docs/decisions.md) — decisões de stack e organização.
- [`docs/roadmap.md`](docs/roadmap.md) — marcos de desenvolvimento.

## Limitações

- Não há gateway, backend, autenticação, banco nem cobrança real.
- Não há persistência de transações: o estado some ao recarregar a página.
- Os rótulos do rodapé, “Termos de uso”, “Política de privacidade” e “Fale com a gente” não abrem páginas reais.
- A cópia das telas de resultado segue a referência visual (“assinatura ativa”, “Enviamos o recibo”, “pedido continua reservado”), embora nada disso exista fora da simulação. Os botões de sucesso deixam isso explícito com avisos locais.
- Não há testes automatizados unitários ou end-to-end.

## Status

Pronto para avaliação. A publicação deste repositório em um remoto fica a cargo de quem for entregar; esta documentação não inclui commit nem push.

## Licença

Projeto desenvolvido para fins de avaliação técnica.
