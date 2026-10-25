# Arquitetura

## 1. Visão geral

Aplicação frontend desenvolvida com Angular e Tailwind CSS 4 para simular um checkout de assinatura do Nexo Pro.

A arquitetura deve ser simples, modular e proporcional ao escopo do desafio.

## 2. Tecnologias

- Angular 22 com componentes standalone.
- Angular Router para navegação.
- Signal Forms (`@angular/forms/signals`) para validação dos formulários.
- Signals para gerenciamento de estado.
- Tailwind CSS 4 para layout: tokens em `@theme` e utilitários nas templates.
- Lucide (`@lucide/angular`) para glifos de UI.

Não utilizar NgRx, Bootstrap, kit de UI nem backend. Marcas (nexo, Visa, Mastercard, Pix) são SVG ou asset; o QR Pix é estático.

## 3. Organização do código

Organizar em quatro camadas, típicas de uma aplicação Angular enterprise, com identificadores em inglês. Aliases: `@core/*`, `@shared/*`, `@layout/*`, `@features/*`.

- **core** — borda da aplicação: catálogo do produto e o simulador no lugar de um gateway.
- **shared** — contrato (`CheckoutSnapshot`) e util de cartão, para a feature importar sem copiar regra.
- **layout** — chrome do funil de conversão (`Guest`, header e footer). Não é feature nem UI genérica: um app logado teria outro shell.
- **features** — telas e o estado do funil. O stepper fica em `features/checkout/`. Não sobe para `shared`.

Nomes: arquivo kebab-case igual à classe (`CheckoutSuccess` → `checkout-success.ts`); seletor `app-` + nome do arquivo (`app-header`, `app-stepper`); sem `.component.ts` e sem `*-page.ts`. Cada componente fica na própria pasta (`header/header.ts`), como o `ng generate component`. Sucesso e erro usam o prefixo `checkout-` porque a classe `Error` colide com o `Error` nativo; `payment.ts` não precisa desse prefixo. Sem pasta `interfaces/` e sem `IPaymentSimulator`. Componentes de UI usam `*.ts` e `*.html`; CSS de componente só entra quando um utilitário Tailwind não cobre o caso.

```text
src/app/
  app.ts
  app.html
  core/
    constants/nexo-pro.ts
    services/payment-simulator.ts
  shared/
    models/checkout.model.ts
    utils/card.ts
  layout/
    guest/
      guest.ts / guest.html
      components/header/header.ts (+ .html)
      components/footer/footer.ts (+ .html)
  features/
    checkout/
      checkout.ts / card.schema.ts / checkout-store.ts
      payment/payment.ts (+ .html)
      checkout-success/checkout-success.ts (+ .html)
      checkout-error/checkout-error.ts (+ .html)
      components/stepper/stepper.ts (+ .html)
      components/order-summary/order-summary.ts (+ .html)
      components/payment-methods/payment-methods.ts (+ .html)
      components/card-fields/card-fields.ts (+ .html)
      components/pix-panel/pix-panel.ts (+ .html)
      components/processing-panel/processing-panel.ts (+ .html)
  app.routes.ts
  app.config.ts
src/styles.css
public/design/
```

O checkout é um funil guest isolado (tipo Stripe Checkout), não o shell logado do produto. Cabeçalho e rodapé de conversão vivem em `layout/guest/`. O stepper existe uma vez no host `Checkout`. Pagamento, sucesso e erro são rotas filhas e só renderizam o miolo. Não há layout autenticado neste repositório. O `CheckoutStore` permanece na feature; guards futuros também. O restante da UI (resumo, formulário, Pix) entra em `features/checkout/`.

## 4. Estado e fluxo de pagamento

O `CheckoutStore` é responsável pelo estado compartilhado do checkout, utilizando Signals, somente em memória. Expõe o snapshot com `asReadonly()` e derivados com `computed()`. Dependências entram com `inject()`, não pelo construtor.

O `PaymentSimulator` (`core/services`) simula os resultados de pagamento com atraso de aproximadamente 1.200 ms via `Promise` e `setTimeout`. É a borda no lugar de um gateway. Não usar `resource()`: pagar é um comando, não uma leitura reativa.

Nomes sem sufixo `Service`, alinhados ao style guide Angular 22 (arquivo = classe).

O estado deverá representar os seguintes status:

- `idle`
- `processing`
- `success`
- `error`

O status `processing` é apresentado na própria página de checkout. Depois do atraso simulado, a aplicação navega para `/checkout/success` ou `/checkout/error`.

O estado compartilhado pode guardar meio de pagamento, bandeira, últimos 4 dígitos, valor, identificador `#NX-10482`, e-mail fictício e status. Não guardar o número completo do cartão nem o CVV.

Os componentes serão responsáveis pela apresentação e interação com o usuário, sem concentrar toda a lógica de negócio nos templates. Layout e estados visuais usam utilitários Tailwind e `[class.*]` no HTML; o TypeScript não monta strings de classe.

## 5. Formulários

Utilizar Signal Forms (`@angular/forms/signals`) para os campos de cartão e suas validações.

A lógica de validação deve permanecer separada da apresentação, com mensagens de erro claras e acessíveis, alinhadas à especificação e a `public/design/payment-states.png`.

Crédito e débito compartilham o mesmo formulário, as mesmas validações e os mesmos cartões de teste.

## 6. Navegação

Utilizar Angular Router com o shell `Guest` e o host do checkout, rotas filhas lazy (`loadComponent`):

- `/` redireciona para `/checkout`.
- `/checkout` — `Guest` (header/footer de conversão) + `Checkout` (stepper) + miolo `Payment`.
- `/checkout/success` — o mesmo chrome + miolo de sucesso.
- `/checkout/error` — o mesmo chrome + miolo de erro.

O indicador de etapas não é uma rota: Pedido não tem tela; pagamento e erro usam o passo Pagamento; sucesso usa Confirmação.

As telas de resultado só poderão ser acessadas quando houver um resultado válido em memória, por meio de `CanActivate` ou `CanMatch` nos filhos `success` e `error`. Caso contrário, o usuário retorna ao checkout.

“Tentar novamente” navega para `/checkout` mantendo o meio selecionado. “Escolher outro meio” navega para `/checkout` e limpa a seleção.

## 7. Segurança e limitações

- Não realizar pagamentos reais.
- Não armazenar o número completo do cartão ou CVV no estado compartilhado, armazenamento do navegador ou logs.
- Não usar `sessionStorage` nem `localStorage` para o checkout.
- Manter apenas os dados necessários para apresentar o resultado.
- Não implementar backend, autenticação ou persistência.
- Identificar claramente as operações simuladas.

## 8. Qualidade

Seguir a decisão de qualidade de código em `docs/decisions.md` e o [style guide Angular 22](https://angular.dev/style-guide).

- Componentes apresentam; a regra de pagamento fica no `CheckoutStore` e no `PaymentSimulator`.
- O store só muda por métodos; o snapshot é `asReadonly()`.
- Um conceito por arquivo. `core`, `shared` e `layout` são camadas; as telas e o `CheckoutStore` ficam em `features/`.
- `Guest` cuida do chrome, `Checkout` do stepper e do outlet, o miolo da tela da rota.

Validar a aplicação por meio da matriz de verificações manuais da especificação, revisão de acessibilidade, inspeção do console, build de produção e conferência pixel-perfect contra `public/design/`.
