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

**Status:** Concluído

- [x] Criar o projeto Angular.
- [x] Registrar a estrutura inicial em um commit.
- [x] Configurar Tailwind CSS 4.
- [x] Validar o ambiente e o build de produção.

**Conclusão:** aplicação inicial executável, estilização configurada e build funcionando.

## Marco 2 — Estrutura visual

**Status:** Concluído

- [x] Definir estilos globais e tokens visuais em `src/styles.css`.
- [x] Preencher o chrome já existente: header e footer no `Guest`, stepper no host `Checkout`, em pixel-perfect, sem duplicar nas telas.
- [x] Estabelecer o layout responsivo do chrome compartilhado.
- [x] Conferir pixel-perfect da estrutura compartilhada contra `public/design/`.

**Conclusão:** header e footer no funil guest e stepper no checkout, cada um uma vez, pixel-perfect contra as telas em `public/design/`.

## Marco 3 — Estado e simulação

**Status:** Concluído

- [x] Implementar os modelos e o serviço de estado.
- [x] Implementar a simulação determinística de pagamentos.
- [x] Controlar processamento, resultados e novas tentativas.

**Conclusão:** estado consistente e resultados de pagamento conforme a especificação.

## Marco 4 — Checkout

**Status:** Não iniciado

- [ ] Implementar seleção do meio de pagamento.
- [ ] Implementar formulário de cartão e validações com Signal Forms.
- [ ] Implementar fluxo Pix simulado.
- [ ] Implementar resumo do pedido e estado de processamento no miolo de `/checkout`.
- [ ] Conferir pixel-perfect do checkout, do Pix e da validação contra `public/design/`.

**Conclusão:** os três meios de pagamento funcionam conforme o comportamento definido e o visual corresponde às telas de referência.

## Marco 5 — Resultados e navegação

**Status:** Não iniciado

- [ ] Implementar o miolo das telas de sucesso e erro.
- [ ] Implementar nova tentativa e troca de meio.
- [ ] Tratar acesso aos filhos `success` e `error` sem estado válido (`CanActivate` / `CanMatch`).
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
