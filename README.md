# Woovi Challenge

Este repositório implementa uma solução para o desafio proposto de criar uma feature de Pix Parcelado.

![image (8)](https://user-images.githubusercontent.com/2005841/208023052-ce50a746-df80-4687-9430-eab399eabd5a.png)

## O Problema

Como possibilitar ao usuário o pagamento de uma cobrança PIX através de crédito bancário? O lojista/recebedor receberá o pagamento em D+0, porém o usuário/pagador efetuará o pagamento em parcelas

## Desafios

- O pagamento da cobrança deve ser feita de forma imediata (lojista/recebedor receberá o pagamento em D+0)
- O usuário/pagador poderá escolher pagar de forma à vista, através de pagamento instantâneo PIX.
- O usuário/pagador poderá escolher pagar de forma parcelada. Neste caso, deverá efetuar o pagamento da primeira parcela à vista, através de pagamento instantâneo PIX.
- O sistema de pagamento deve gerar um QRCode dinâmico, possibilitando ao usuário efetuar o pagamento à vista ou da primeira parcela, caso opte pela modalidade de pagamento parcelado.
- O sistema de pagamento deve integrar com um gateway de pagamento, possibilitando ao usuário o pagamento através de cartão de crédito.
- O sistema de pagamento deve integrar com um avaliador de risco que retornará as condições de parcelamento.

## Design da Solução

### Backend

1. Autenticação: o usuário deve se identificar com e-mail e senha para consumir endpoints
2. Feature Cobrança: CRUD da entidade cobrança, com valor da cobrança. Deve controlar também o estado da cobrança. Quatro fases: inicial, aguardando pagamento à vista, aguardando pagamento parcelado e pago.
3. Integraçao com gateway de pagamento para geração de pagamento Instantâneo PIX: integração com API de geração de pagamento instantâneo PIX, com retorno de QRCode dinâmico e detalhes do pagamento.
4. Integração com sistema openfinance: forcendo os dados do usuário deve ser possível retornar condições de parcelamento (quantidade de parcelas e juros).
5. Integração com um gateway de pagamento para ser possível ao usuário realizar pagamentos parcelados no cartão de crédito.
6. Endpoints de webhook para receber atualização de pagamento de PIX.

### Frontend

1. Autenticação: o usuário fornecerá e-mail e senha para fazer login na plataforma. O Access Token (JTW) ficará salvo nos cookies da aplicação. Caso o cookie não exista ou expirar, o usuário será redirecionado para a página de login.
2. Página de exibição de detalhes de uma cobrança. Está página consultará endpoint de condições de pagamento e informará ao usuário se é possível realizar o pagamento parcelado e em quantas parcelas.
3. Página de exibição de detalhes de um pagamento instantâneo PIX, com QRCode dinâmico e detalhes do pagamento.
4. Página de formulário de pagamento no cartão de crédito
