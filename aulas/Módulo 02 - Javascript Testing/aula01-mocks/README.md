# Trabalhando com Mocks

## O que foi feito

- Nesta aula foi mostrado como testar uma aplicação sem utilização de frameworks.
- Utilizamos o modulo "assert" nativo do JS para realizar os testes.
- O testes eram basicamente em:
  - Validar os headers do arquivo;
  - Validar se o arquivo estava vazio
  - Validar se o arquivo apresentava ao menos 3 itens, sem contar o header
- Foram então criados os mocks para cada cenário
- Foi criado o arquivo "constants.js" que é o responsavel por
guardar os valores de retorno em caso de erro;
- Foi criado o arquivo "file.js" que seria o core da aplicação,
onde as funções de leitura, validação e parse do arquivo "csv" para
formato "json" foram descritas e criadas.
- Foi criado o arquivo "user.js" que basicamente continha uma classe
de representação do nosso objeto "usuário" e seria utilizada no
parse do arquivo csv para json.
- Por fim arquivo "index.test.js" foi criado para guardar a suite de
testes da nossa aplicação.

## Por que trabalhar com testes?
- Qualidade se software é um dos pilares da construção de um sistema
- Para isso a aplicação deve passar por diversos testes, incluindo os
manuais.
- Dessa forma, como devs precisamos testar classes/funções/serviços criados para garantir que o que foi desenvolvida foi validado e não
quebrará em produção (ou pelo menos se espera que isso aconteça).
- Dessa forma faz-se muito importante entender e aplicar os testes
na nossa rotina de desenvolvimento.

## Onde aplicar testes?
- Hoje existem varios tipos de testes existentes, sendo alguns:
  - Unitários,
  - End to End (E2E),
  - De integração
  - Caixa preta
  - E outros...
- Geralmente um dev backend ira fazer basicamente testes unitários e de integração, mas como sabemos nada na TI é bala de prata, então
poderão existir outros cenários e diferentes tipos de testes.
- Levando em consideração testes unitários e de integração, devemos
então (como dev), testar toda classe/função/dependencia/serviço e etc, onde há regras de negócio, ou ainda, onde há um certo grau
crítico como processamento demasiado (principalmente para
microserviços) e aplicações em nuvem e tantos outros cenários.