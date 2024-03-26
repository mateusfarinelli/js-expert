# Segurança em expressões regulares, manipulação de erros customizados e projeto parte 02

## Mão na massa

- Vamos começar definindo um regex que dependendo do texto avaliado irá gerar um `catastrophic backtracking`

  ```js
    const regularExpression: /^([a-z|A-Z|0-9]+\s?)+$/mgi
  ```

- Se jogarmos esse regex no `regex101.com` com uma frase aleatória terminada em `?` por exemplo atingiremos o `catastrophic backtracking`, isso por que o ReGex entrará em looping infinto já que não estamos avaliando a possibilidade de um caractere especial, e a forma como foi escrita faz com que esse loop aconteça
- Assim então para garantir nossa segurança vamos aplicar algumas práticas ao nosso desenvolvimento utilizando a lib `safe-regex`
- Em seguida vamos implementar uma classe de erro customizada para os regex invalidos

  ```js
    const safeRegex = require('safe-regex')

    class InvalidRegexErro extends Error {
      constructor(ex) {
        super(`This ${ex} is unsafe dude!`)
        this.name = "InvalidRegexError"
      }
    }

    const evaluateRegex = (exp) => {
      const isSafe = safeRegex(exp)

      if(isSafe) return exp

      throw new InvalidRegexError(exp)
    }

    module.exports = { evaluteRegex, InvalidRegexError }
  ```

- Vamos seguir agora criando uma classe de test para nossa classe de validação de ReGex

  ```js
    const { describe, it } = require('mocha')
    const { expect } = require('chai')
    const { InvalidRegexError, evaluateRegex } = require('./../src/util')

    describe('Util', () => {
      it('#evaluateRegex should throw an error using an unsafe regex', () => {
        const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/

        expect(() => evaluateRegex(unsafeRegex).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe dude!`))
      })

      i('#evaluateRegex should not throw an error using a safe regex', () => {
        const safeRegex = /^([a-z])$/
                expect(() => evaluateRegex(unsafeRegex).to.not.throw)
                expect(() => evaluateRegex(unsafeRegex).to.be.ok)
      })
    })
  ```

- Podemos ainda testar uma expressão regular no terminal e saber o comportamento dessa expressão no sistema, executando o seguinte comando:

  ```bash
    time \
    node --eval "/^([a-z|A-Z|0-9]+\s?)+$/.test('eaaae man como vai voce e como vai voce e como vai voce?') && console.log('legal')"
  ```

- Seguindo agora para um novo caso de testes do documento que trabalhamos na aula passada, vamos testar nosso padrão `FluentAPI` para retornar cada "parametro" em colunas em nossa classe de teste `textProcessorFluentApiTest.js`

  ```js
  ...
    it('#divideTextInColumns', () => {
      const content = [
        [
          "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
          "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. "
        ].join("\n"),
      ]

      const result = new TextProcessorFluentAPI(content)
        .divideTextInColumns()
        .build()

      const expected = [
        [
          "Xuxa da Silva", 
          " brasileira", 
          " casada", 
          " CPF 235.743.420-12", 
          " residente e \ndomiciliada a Rua dos bobos",
          " zero",
          " bairro Alphaville",
          " São Paulo. "
        ]
      ]

      expect(result).to.be.deep.equal(expected)
    }) 
  ```

- Em seguida vamos implementar o método `divideTextInColumns()`

  ```js
  const { evaluateRegex } = require('./../src/util')
  ...
  divideTextInColumns() {
    const splitRegex = evaluateRegex(/,/)
    this.#content = this.#content.map(line => line.split(splitRegex))

    return this
  }
  ```

- Na sequencia vamos agora remover os caracteres vazios começando com nosso teste

  ```js
    ...
    it('#removeEmptyCharacters', () => {
      const content = [
        [
          "Xuxa da Silva", 
          " brasileira", 
          " casada", 
          " CPF 235.743.420-12", 
          " residente e \ndomiciliada a Rua dos bobos",
          " zero",
          " bairro Alphaville",
          " São Paulo. "
        ]
      ]
      const result = new TextProcessorFluentAPI(content)
        .removeEmptyCharacters()
        .build()

            const expected = [
        [
          "Xuxa da Silva", 
          "brasileira", 
          "casada", 
          "CPF 235.743.420-12", 
          "residente e domiciliada a Rua dos bobos",
          "zero",
          "bairro Alphaville",
          "São Paulo."
        ]
      ]

      expect(result).to.be.deep.equal(expected)
    })
  ```

- Agora vamos seguir para implementação do método `removeEmptyCharacters` no nosso `TextProcessorFluentAPI`

  ```js
  const { evaluateRegex } = require('./../src/util')
  ...
  removeEmptyCharacters() {
    // ^\s => pega todos os espaços no inicio da string
    // |\s+$ => ou espaços no fim da string
    // |\n  => ou quebras de linhas
    const trimSpaces = evaluateRegex(/^\s+|\s+$|\n/)
    this.#content = this.#content.map(line => line.map(item => item.replace(trimSpaces, "")))

    return this
  }
  ```