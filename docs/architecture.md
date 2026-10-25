# Arquitetura

## 1. Visão geral

Aplicação frontend desenvolvida com Angular e Tailwind CSS 4 para simular um checkout de assinatura do Nexo Pro.

A arquitetura deve ser simples, modular e proporcional ao escopo do desafio.

## 2. Tecnologias

- Angular 22 com componentes standalone.
- Angular Router para navegação.
- Signal Forms (`@angular/forms/signals`) para validação dos formulários.
- Signals para gerenciamento de estado.
- Tailwind CSS 4 para estilização.
- Lucide (`@lucide/angular`) para glifos de UI.

Não utilizar NgRx, Bootstrap, kit de UI nem backend. Marcas (nexo, Visa, Mastercard, Pix) são SVG ou asset; o QR Pix é estático.

## 3. Organização do código

Organizar a aplicação por área de feature, com identificadores em inglês, conforme o [style guide Angular 22](https://angular.dev/style-guide#project-structure). Evitar pastas globais por tipo (`pages`, `services`, `src/app/components/`). `guest/components/` e `checkout/components/` são a exceção consciente: chrome de conversão do funil e stepper da feature, não um depósito de UI compartilhado. Uma área autenticada teria o próprio chrome, sem reusar header e footer do Guest.

Nomes: arquivo kebab-case igual à classe (`CheckoutSuccess` → `checkout-success.ts`); seletor `app-` + nome do arquivo (`app-header`, `app-stepper`); sem `.component.ts` e sem `*-page.ts`. Sucesso e erro usam o prefixo `checkout-` porque a classe `Error` colide com o `Error` nativo; `payment.ts` não precisa desse prefixo.

```text
src/app/
  app.ts                      só router-outlet
  app.html
  guest/
    guest.ts                  funil: header + outlet + footer
    components/
      header.ts
      footer.ts
  checkout/
    checkout.ts               host: stepper + outlet
    payment.ts                miolo de pagamento
    checkout-success.ts       miolo de sucesso
    checkout-error.ts         miolo de erro
    components/
      stepper.ts
  app.routes.ts
  app.config.ts
src/styles.css               estilos globais e tokens visuais
public/design/               composições de referência para pixel-perfect
```

O checkout é um funil guest isolado (tipo Stripe Checkout), não o shell logado do produto. Cabeçalho e rodapé de conversão vivem no `Guest`. O stepper existe uma vez no host `Checkout`. Pagamento, sucesso e erro são rotas filhas e só renderizam o miolo. Não há layout autenticado neste repositório. Serviços de estado e simulação, modelos, guards e o restante da UI (resumo, formulário, Pix) ficam em `src/app/checkout/`, junto da feature.

## 4. Estado e fluxo de pagamento

O `CheckoutStateService` será responsável pelo estado compartilhado do checkout, utilizando Signals, somente em memória.

O `PaymentSimulatorService` será responsável por simular os resultados de pagamento com atraso de aproximadamente 1.200 ms via `Promise` e `setTimeout`.

O estado deverá representar os seguintes status:

- `idle`
- `processing`
- `success`
- `error`

O status `processing` é apresentado na própria página de checkout. Depois do atraso simulado, a aplicação navega para `/checkout/success` ou `/checkout/error`.

O estado compartilhado pode guardar meio de pagamento, bandeira, últimos 4 dígitos, valor, identificador `#NX-10482`, e-mail fictício e status. Não guardar o número completo do cartão nem o CVV.

Os componentes serão responsáveis pela apresentação e interação com o usuário, sem concentrar toda a lógica de negócio nos templates.

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

Priorizar componentes com responsabilidades claras, reutilização quando necessária e código fácil de compreender.

Validar a aplicação por meio da matriz de verificações manuais da especificação, revisão de acessibilidade, inspeção do console, build de produção e conferência pixel-perfect contra `public/design/`.
