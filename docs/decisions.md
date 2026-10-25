# Decisões Técnicas

## 1. Stack tecnológica

Utilizar Angular 22 com componentes standalone, Angular Router, Signal Forms (`@angular/forms/signals`), Signals, Tailwind CSS 4 e Lucide (`@lucide/angular`) para glifos de UI.

**Motivo:** utilizar ferramentas modernas do Angular sem adicionar complexidade desnecessária.

Não utilizar NgRx nem Bootstrap. Não utilizar kit de UI (Spartan, daisyUI ou equivalente): o pixel-perfect contra `public/design/` é Tailwind, não componentes de biblioteca.

Separar três tipos de desenho:

- Glifos de UI (cadeado, check, alerta, copiar, escudo, seta, spinner): Lucide (`@lucide/angular`), tree-shakeable, `currentColor`.
- Marcas (nexo, Visa, Mastercard, logo Pix): SVG ou asset. Não são ícones de sistema; Lucide não tem Pix.
- QR Code Pix: imagem ou SVG estático, sem biblioteca de QR.

Tailwind CSS 4 continua sendo a biblioteca de layout.

O Prettier já está no repositório (`.prettierrc` e dependência de desenvolvimento) e deve ser mantido para formatação. Não é uma biblioteca de interface.

RxJS permanece como dependência do Angular. Não será usado como ferramenta de estado nem listado como tecnologia de produto.

## 2. Gerenciamento de estado

Utilizar Signals por meio de um serviço dedicado chamado `CheckoutStateService` na feature `checkout/`, com o decorator `@Service` e `inject()` em vez de injeção por construtor.

**Motivo:** o fluxo possui pouco estado compartilhado e não justifica uma biblioteca adicional. O Angular 22 recomenda `@Service` e `inject()` para serviços singleton.

## 3. Simulação de pagamento

Implementar os pagamentos exclusivamente no frontend, com resultados determinísticos:

- `4242 4242 4242 4242`: aprovado.
- `4000 0000 0000 0002`: recusado, com o motivo “Cartão não autorizado”.
- Outros cartões válidos de bandeiras suportadas: aprovados.
- Pix: aprovado após a confirmação explícita do usuário.

O atraso de aproximadamente 1.200 ms será implementado no `PaymentSimulatorService` com `Promise` e `setTimeout`.

Crédito e débito compartilham as mesmas regras e os mesmos cartões de teste.

**Motivo:** permitir a demonstração dos fluxos sem backend ou gateway de pagamento.

## 4. Persistência e dados sensíveis

Manter o estado do checkout somente em memória. Não persistir o número completo do cartão ou CVV em serviços compartilhados, armazenamento do navegador, rotas ou logs.

Não utilizar `sessionStorage` nem `localStorage`. Atualizar `/checkout/success` ou `/checkout/error` sem estado em memória redireciona para `/checkout`.

O estado compartilhado pode guardar meio, bandeira, últimos 4 dígitos, valor, identificador `#NX-10482`, e-mail fictício e status.

**Motivo:** limitar a exposição de dados e manter o comportamento simples e previsível.

## 5. Navegação e layout

Utilizar as rotas `/`, `/checkout`, `/checkout/success` e `/checkout/error`. A rota `/` redireciona para `/checkout`.

O `Guest` é o único shell: funil de conversão (nexo, “Checkout seguro”, rodapé institucional), sem avatar, menu de conta ou sidebar. Header e footer ficam em `guest/components/`; uma área autenticada teria chrome próprio, sem reusar esses arquivos. O `Checkout` concentra o stepper. Pagamento, sucesso e erro são filhos lazy com `loadComponent`. O checkout não é o layout logado do produto; “Acessar meu espaço” no sucesso é destino futuro, não um envelope destas telas.

As rotas de resultado exigem um resultado válido em memória, verificado por `CanActivate` ou `CanMatch` nos filhos `success` e `error`. Sem ele, o usuário retorna ao checkout.

O status `processing` é apresentado no miolo de `/checkout`. Não existe rota de processamento.

Não haverá SSR.

**Motivo:** não duplicar header, footer ou stepper entre as telas, evitar resultados sem uma tentativa correspondente e manter o fluxo alinhado às telas de referência.

## 6. Testes e qualidade

Não implementar testes automatizados unitários ou end-to-end.

Realizar as verificações manuais da matriz da especificação, incluindo pixel-perfect, validações, navegação, responsividade, acessibilidade WCAG 2.2 AA e build de produção.

O scaffold do CLI ainda contém `npm test` e `tsconfig.spec.json`. Esses resíduos não fazem parte do escopo e não serão usados. A limpeza, se ocorrer, fica para um marco posterior de fundação ou entrega — não altera a decisão de não testar.

**Motivo:** manter o escopo acordado e verificar explicitamente os principais comportamentos.

## 7. Interface e documentação

A interface e a documentação serão escritas em português brasileiro. Identificadores, nomes de arquivos e código-fonte permanecerão em inglês. O HTML usará `lang="pt-BR"`.

Os formulários de cartão usarão Signal Forms no Marco 4, não Reactive Forms.

A referência visual são as composições em `public/design/`. A implementação deve ser pixel-perfect contra esses arquivos.

O formulário de cartão não abre preenchido. As composições mostram o estado válido, não o estado inicial.

O QR Code Pix é uma imagem ou SVG estático, sem biblioteca de QR. O código copia e cola é `000201.NEXO-PRO.7990.DEMO`.

Os rótulos do rodapé e “Fale com a gente” não navegam para páginas reais.

O ambiente de execução previsto é Node.js 20.19+ ou 22.12+, com npm.

**Motivo:** manter a experiência adequada ao público brasileiro, o código alinhado às convenções técnicas e o visual fiel às telas de referência.
