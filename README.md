# Woovi Challenge

Este repositório implementa uma solução para o desafio proposto de criar uma feature de Pix Parcelado.

## O Problema

Como possibilitar ao usuário o pagamento de uma cobrança PIX através de crédito bancário? O lojista/recebedor receberá o pagamento em D+0, porém o usuário/pagador efetuará o pagamento em parcelas

## Desafios

- O pagamento da cobrança deve ser feita de forma imediata (lojista/recebedor receberá o pagamento em D+0)
- O usuário/pagador poderá escolher pagar de forma à vista, através de pagamento instantâneo PIX.
- O usuário/pagador poderá escolher pagar de forma parcelada. Neste caso, deverá efetuar o pagamento da primeira parcela à vista, através de pagamento instantâneo PIX.
- O sistema de pagamento deve gerar um QRCode dinâmico, possibilitando ao usuário efetuar o pagamento à vista ou da primeira parcela, caso opte pela modalidade de pagamento parcelado.
- O sistema de pagamento deve integrar com um gateway de pagamento, possibilitando ao usuário o pagamento através de cartão de crédito.

## Design da Solução

### Backend

1. Autenticação: o usuário deve se identificar com e-mail e senha para consumir endpoints
2. Feature Cobrança: CRUD da entidade cobrança, com valor e favorecido.
3. Feature Pagamento: CRUD da entidade pagamento, que pode ser de dois tipos: pagamento à vista ou pagamento parcelado.
4. integraçao com gateway de pagamento para geração de pagamento Instantâneo PIX: integração com API de geração de pagamento instantâneo PIX, com retorno de QRCode dinâmico e detalhes do pagamento.
5. integração com sistema openfinance: forcendo os dados do usuário deve ser possível retornar condições de financiamento (quantidade de parcelas e juros).

### Frontend

1. Autenticação: o usuário fornecerá e-mail e senha para fazer login na plataforma. O Access Token (JTW) ficará salvo nos cookies da aplicação. Caso o cookie não exista ou expirar, o usuário será redirecionado para a página de login.
2. Página de exibição de detalhes de uma cobrança. Está página consultará endpoint de condições de pagamento e informará ao usuário se é possível realizar o pagamento parcelado e em quantas parcelas.
3. Página de exibição de detalhes de um pagamento instantâneo PIX, com QRCode dinâmico e detalhes do pagamento.
4. Página de formulário de pagamento no cartão de crédito
