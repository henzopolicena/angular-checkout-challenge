# Roadmap

## Status dos marcos

- **Não iniciado:** trabalho ainda não começou.
- **Em andamento:** trabalho em execução.
- **Concluído:** critérios de aceitação atendidos.

## Marco 0 — Alinhamento da documentação

**Status:** Concluído

- [x] Conferir existência e consistência dos documentos.
- [x] Alinhar escopo, stack, fluxos, rotas e critérios de conclusão.
- [x] Registrar requisitos ausentes e decisões.
- [x] Alinhar o README à intenção do desafio.
- [x] Disponibilizar as telas Figma em `public/design/` e apontá-las na especificação.

**Conclusão:** documentação consistente, referência visual citada sem ambiguidades e decisões registradas.

## Marco 1 — Fundação do projeto

**Status:** Em andamento

- [x] Criar o projeto Angular.
- [x] Registrar a estrutura inicial em um commit.
- [ ] Configurar Tailwind CSS 4.
- [ ] Validar o ambiente e o build de produção.

**Conclusão:** aplicação inicial executável, estilização configurada e build funcionando.

## Marco 2 — Estrutura visual

**Status:** Não iniciado

- [ ] Definir estilos globais e tokens visuais.
- [ ] Implementar cabeçalho, indicador de etapas e rodapé.
- [ ] Estabelecer o layout responsivo.
- [ ] Conferir pixel-perfect da estrutura compartilhada contra `public/design/`.

**Conclusão:** estrutura visual compartilhada implementada pixel-perfect contra as telas em `public/design/`.

## Marco 3 — Estado e simulação

**Status:** Não iniciado

- [ ] Implementar os modelos e o serviço de estado.
- [ ] Implementar a simulação determinística de pagamentos.
- [ ] Controlar processamento, resultados e novas tentativas.

**Conclusão:** estado consistente e resultados de pagamento conforme a especificação.

## Marco 4 — Checkout

**Status:** Não iniciado

- [ ] Implementar seleção do meio de pagamento.
- [ ] Implementar formulário de cartão e validações.
- [ ] Implementar fluxo Pix simulado.
- [ ] Implementar resumo do pedido e estado de processamento.
- [ ] Conferir pixel-perfect do checkout, do Pix e da validação contra `public/design/`.

**Conclusão:** os três meios de pagamento funcionam conforme o comportamento definido e o visual corresponde às telas de referência.

## Marco 5 — Resultados e navegação

**Status:** Não iniciado

- [ ] Implementar telas de sucesso e erro.
- [ ] Configurar as rotas `/`, `/checkout`, `/checkout/success` e `/checkout/error`.
- [ ] Implementar nova tentativa e troca de meio.
- [ ] Tratar acesso às rotas de resultado sem estado válido.
- [ ] Conferir pixel-perfect das telas de sucesso e erro contra `public/design/`.

**Conclusão:** o fluxo completo funciona, não apresenta resultados sem uma tentativa válida e as telas de resultado correspondem à referência.

## Marco 6 — Revisão de qualidade

**Status:** Não iniciado

- [ ] Refinar o visual e a responsividade, incluindo pixel-perfect das quatro composições.
- [ ] Verificar acessibilidade e navegação por teclado.
- [ ] Executar a matriz de verificações manuais da especificação.
- [ ] Validar o build de produção e o console.

**Conclusão:** verificações realizadas, problemas relevantes corrigidos e resultados registrados.

## Marco 7 — Documentação e entrega

**Status:** Não iniciado

- [ ] Revisar o README de intenção já existente e alinhá-lo ao comportamento real.
- [ ] Registrar limitações e instruções de execução.
- [ ] Revisar o repositório e o histórico de commits.
- [ ] Enviar a versão final ao GitHub.

**Conclusão:** repositório pronto para avaliação e demonstração, com documentação em paridade com a aplicação.
