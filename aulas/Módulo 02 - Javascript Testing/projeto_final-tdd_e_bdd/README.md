# Projeto Fnal - TDD & BDD - Parte 01

## O que iremos fazer?

- Iremos desenvolver "todo" backend necessário para que possamos construir uma aplicação que consuma e gere dados e que possamos testar simulando uma empresa de aluguel de carros
- Iremos aplicar o padrão de repositories além de trabalhar com layers
- Não iremos implementar um "front-end" para nosso projeto
- Iremos aplicar os conceitos e técnicas de TDD, BDD e Testes unitários já vistos

## Mão na massa

- iniciamos o projeto com o comando
  - `npm init -y`
- criamos as diretorios `database` e `seed`
- criamos o arquivo `index.js` na diretorio seed com um simples `console.log`
- no arquivo `package.json` criamos o script para rodar o arquivo `index.js` criado no passo anterior da seguinte forma:
  - `seed: node ./seed`
- Nesse caso não precisamos informar qual é o arquivo a ser executado, já que por padrão o node vai buscar sempre o index
- seguimos instalando a lib `faker` como dependencia de desenvolvimento
- criamos a diretorio `src`
- seguimos criando o arquivo `src/entities/base/base.js` que é uma classe base contendo os parametros `id` e `name` e utilizaremos sempre essa classe em outras classes que terão as mesmas props
- em seguida criamos os arquivos `src/entities/car.js`, `src/entities/customer.js` e `src/entities/carCategory.js` extendendo a classe base
- seguimos implementando as propriedades necessárias para cada entidade criada, passando essas props no construtor de cada classe, lembrando de utilizar o método `super` para ober as propriedades extendidas de base
- seguimos agora fazendo a implementação do arquivo `seed.js`
  - importamos todas as classes
  - importamos `join` de `path`
  - definimos o diretorio output utilizando o join e apontando para o diretório `database` criado no inicio
  - definimos um novo objeto `CarCateogry` e infermios valor utilizando o `faker`
  - geramos um array de `Car` a partir de um loop for e novamente criando objetos desse tipo utilizando o `faker`
  - inserimos o `id` gerado para cada `Car` no objeto `CarCategory`
  - definimos um método `write` que recebe filename e data e utiliza o método `writeFile` da lib `fs` passando o `seederBaseFolder`, `filename` e `JSON.stringfy(data)`
  - assim os arquivos serão criados com o nome e dados inferidos, além de serem criados no diretório `database`
  - executamos um étodo `write` para cada objeto que definimos anteriormente
  - voltando ao loop utilizado para `Car`, vamos criar os objetos `Customer` ainda utilizando o `faker`

## - Libs

- Faker
  - É uma lib para geração de dados de forma automatica e randomizada