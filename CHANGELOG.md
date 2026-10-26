# Changelog

Todas as mudanças relevantes deste projeto são documentadas neste arquivo.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o versionamento segue [SemVer](https://semver.org/lang/pt-BR/).

## [1.0.0] — 2026-10-26

Primeira versão do checkout Nexo Pro para avaliação técnica.

### Added

- Funil de checkout em Angular 22 com crédito, débito e Pix simulados no navegador.
- Validação de cartão (Luhn, Visa/Mastercard, titular, validade e CVV) via Signal Forms.
- Telas de processamento (~3.000 ms), sucesso e erro, com `checkoutResultGuard` nas rotas de resultado.
- Cartões de teste determinísticos: `4242…4242` (aprovado) e `4000…0002` (recusado).
- Estado do funil em memória (`CheckoutStore`); PAN e CVV não são persistidos.

[1.0.0]: https://github.com/henzopolicena/angular-checkout-challenge/releases/tag/v1.0.0
