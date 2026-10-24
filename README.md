# Angular Checkout Challenge

Aplicação frontend de checkout da Nexo, desenvolvida com Angular 22 e Tailwind CSS 4, como parte de um desafio técnico.

O repositório está em desenvolvimento: a stack, as rotas e as telas abaixo descrevem o **alvo** do desafio, não o estado atual do scaffold.

## Objetivo

Implementar uma experiência de checkout responsiva, com validação de formulários, métodos de pagamento simulados e telas de sucesso e erro.

## Tecnologias

- Angular 22
- TypeScript
- Tailwind CSS 4
- Angular Router
- Reactive Forms
- Angular Signals

## Funcionalidades previstas

- Checkout com cartão de crédito, cartão de débito e Pix.
- Validação dos campos de pagamento.
- Simulação determinística dos resultados de pagamento.
- Telas de sucesso e erro.
- Interface responsiva e acessível.
- Navegação protegida contra acesso direto a resultados inválidos.

## Produto

**Nexo Pro**

- Plano mensal.
- 1 usuário.
- Valor: R$ 79,90.

## Requisitos

- Node.js 20.19+ ou 22.12+.
- npm.

## Como executar

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm start
```

Também é possível usar `npx ng serve`. Acesse `http://localhost:4200`.

## Verificação de build

Para verificar se a aplicação pode ser compilada para produção:

```bash
npm run build
```

Também é possível usar `npx ng build`.

## Pagamentos simulados

Esta aplicação é exclusivamente demonstrativa. Nenhuma transação financeira real é realizada.

- **Cartão aprovado:** `4242 4242 4242 4242`
- **Cartão recusado:** `4000 0000 0000 0002`
- **Outros cartões:** resultado conforme as regras de validação e simulação definidas na especificação.
- **Pix:** fluxo inteiramente simulado.

Utilize apenas os dados fictícios fornecidos para demonstração. Não insira informações financeiras reais.

## Documentação

A documentação do projeto está disponível em [`docs/`](docs/):

- [`specification.md`](docs/specification.md) — requisitos e critérios de conclusão.
- [`architecture.md`](docs/architecture.md) — estrutura e organização técnica.
- [`decisions.md`](docs/decisions.md) — decisões técnicas adotadas.
- [`roadmap.md`](docs/roadmap.md) — marcos e etapas de desenvolvimento.

As telas de referência para implementação pixel-perfect estão em [`public/design/`](public/design/).

## Escopo e limitações

- Não há integração com gateway de pagamento.
- Não há backend, banco de dados ou autenticação.
- Não há cobrança real nem persistência de dados financeiros.
- Os dados exibidos nas telas de resultado são fictícios.
- Não há testes automatizados unitários ou end-to-end.

## Status

Em desenvolvimento.

## Licença

Projeto desenvolvido para fins de avaliação técnica.
