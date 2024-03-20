# Padrão Fluent API, Extração de texto base de PDF e Setup de Testes

## Objetivo

- Extrair informações de contrato a partir de um contrato em PDF

---

## Mão na massa

- Criamos o diretório `app` e navegamos até ele

- Iniciamos um novo projeto

  ```console
  npm init -y
  ```

- Iniciamos instalando as libs necessárias

  ```console
    npm i -d mocha@8 chai@4 nyc@15
  ```

- Criamos o arquivo `.nycrc.json` e inserimos as configurações necessárias
- No arquivo `package.json` inserimos os scripts:

  ```json
    "start": "node src/index.js",
    "test": "npx mocha -w --parallel test/*.test.js",
    "test:cov": "npx nyc npx mocha --parallel test/*.test.js"
  ```

- Na sequencia criamos o arquivo `app/src/index.js`
- E comaços com a implementação de da leitura do pdf lendo o arquivo com o método `readFile` do pacote `fs/promises` e normalizamos o `PATH` do arquivo PDF a ser lido com o método `join` do pacote `path`
- Na sequencia, logamos o retorno da leitura do arquivo e notamos então que o arquivo PDF é um binario, e para podermos extrair o texto precisaresmo instalar a lib `pdf-parse` com o comando:
  - `npm i pdf-parse`
- A implementação do nosso `index.js` será:

  ```js
  const { readFile } = require('fs/promise')
  const { join } = require('path')
  const pdf = require('pdf-parse')

  ;(async () => {
    const dataBuffer = readFile(join(__dirname, './../../../docs/contrato.pdf'))
    const data = await pdf(dataBuffer)
    console.log(data.text)

  })
  ```
  
- Logando `data` teremos além do pdf parseado para string, algumas outras informações
- Vamos logar o `data.text` afim de pegar somente o texto do contrato
- E ao executaro comando start vamos acrescentar o `tee` para jogar tudo que tivemos na saida do console para um arquivo, dessa forma:

  ```console
    npm start | tee text.txt
  ```

- Agora limpamos o arquivo e copiamos o texto pra dentro do `regex101.com` para podermos montar a expressão regular mais facilmente
- Vamos começar nossa ReGex:
  - `(?<=)` => **positive lookbehind** para pegar somente os dados que estão posteriores ao grupo selecionado
  - `[contratnte | contratada]:` => para pegar informações sobre um membro ou outro
  - `:\s{1}` => pegar quem tem o literal de ":" e ignorar trechos com mais de 1 espaço
  - `(?!\s)` => **negative lookahead** vai ignorar padrões que até então não foram atendidos, nesse caso, toda expressão que não for do tipo **"CONTRATANTE: "** ou **"CONTRATADA: "** seguido de strings
  - `(.*\n.*?)` => pegar tudo incluindo simbolos antes da primeira quebra de linha **\n** e posteriormente também pegue tudo mas que pare na primeira recorrência utilizando o **non greety** -> `?`
  - `$` => diz que nossa pesquisa pela Expressão Regular acaba no fim da linha
  - Agora sobre as flags:
    - `g` => global, para olhar todo o string/documento passada
    - `m` => multiline, diz que o busca deve ser feita em mais de uma linha
    - `i` => case insensitive, diz para ignorar o tipo de caixa (maiuscula ou minuscula)
  - E o resultado final da nossa expressão ficou:
    - `/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi`

- Agora criamos a classe `textProcessorFLuentAPI.js`
  - O objetivo do Fluent API é executar tarefas como um pieline, step by step
  - No fim o método build é chamado, tornando-se muito parecido com o Builder pattern
  - Sendo a unica diferença que aqui temos a construção de processos enquanto o Builder é sobre construção de objetos
- A implementação do é dada por:
  
  ```js
    class TextProcessorFluentAPI {
      //propriedade privada!
      #content
      constructor(content){
        this.#content = content
      }
      extractPeopleData() {
        const matchPerson = /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi
        const onlyPerson = this.#content.match(matchPerson)
        this.#content = onlyPerson

        return this
      }
      build() {
        return this.#content
      }
    }

    module.exports = TextProcessorFluentAPI
  ```

- Vamos iniciar nossa suite de testes
  - A implementação final é: 

  ```js
  const { describe, it } = require('mocha')
  const { expect } = require('chai')
  const TextProcessorFluentAPI = require('./../src/TextProcessorFluentAPI') 
  const mock = require('./mock/valid')

  decribe('TextProcessorFluentAPI', () => {
    it('#build', () => {
      const result = new TextProcessorFluentAPI(mock).build();

      expect(result).to.be.deep.equal(mock)
    })

    it(#extractPeopleData,() => {
      const result = new TextProcessorFluentAPI(mock)
      .extractPeopleData()
      .build();

      const expected = [
        [
          "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
          "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. "
        ].join("\n"),

        [
          "Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ",
          "domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo."
        ].join("\n")
      ]

      expect(result).to.be.deep.equal(expected)
    })
  })
  ```

---
