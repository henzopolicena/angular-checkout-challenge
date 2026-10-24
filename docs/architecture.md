# Arquitetura

## 1. Visão geral

Aplicação frontend desenvolvida com Angular e Tailwind CSS 4 para simular um checkout de assinatura do Nexo Pro.

A arquitetura deve ser simples, modular e proporcional ao escopo do desafio.

## 2. Tecnologias

- Angular 22 com componentes standalone.
- Angular Router para navegação.
- Reactive Forms para validação dos formulários.
- Signals para gerenciamento de estado.
- Tailwind CSS 4 para estilização.

Não utilizar NgRx, Bootstrap, bibliotecas externas de componentes ou backend.

## 3. Organização do código

Organizar a aplicação por responsabilidades, com identificadores em inglês:

```text
src/app/
  core/          serviços de estado, simulação e guards
  models/        tipos e modelos
  components/    elementos reutilizáveis da interface
  pages/         telas de checkout, sucesso e erro
  app.routes.ts  configuração da navegação
src/styles.css   estilos globais e tokens visuais
public/design/   composições de referência para pixel-perfect
```

- **Core:** `CheckoutStateService`, `PaymentSimulatorService` e guardas das rotas de resultado.
- **Models:** produto, meio de pagamento, status e resultado em memória.
- **Components:** cabeçalho, stepper, resumo do pedido, abas de meio, formulário de cartão, painel Pix e rodapé.
- **Pages:** checkout, sucesso e erro.
- **Routes:** `src/app/app.routes.ts`.
- **Styles:** `src/styles.css`.

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

Utilizar Reactive Forms para os campos de cartão e suas validações.

A lógica de validação deve permanecer separada da apresentação, com mensagens de erro claras e acessíveis, alinhadas à especificação e a `public/design/payment-states.png`.

Crédito e débito compartilham o mesmo formulário, as mesmas validações e os mesmos cartões de teste.

## 6. Navegação

Utilizar Angular Router com as rotas:

- `/` redireciona para `/checkout`.
- `/checkout`
- `/checkout/success`
- `/checkout/error`

As telas de resultado só poderão ser acessadas quando houver um resultado válido em memória, por meio de `CanActivate` ou `CanMatch`. Caso contrário, o usuário retorna ao checkout.

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
