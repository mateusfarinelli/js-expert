# Projeto Fnal - TDD & BDD

## Projeto Fnal - TDD & BDD - Parte 01

### O que iremos fazer?

- Iremos desenvolver "todo" backend necessário para que possamos construir uma aplicação que consuma e gere dados e que possamos testar simulando uma empresa de aluguel de carros
- Iremos aplicar o padrão de repositories além de trabalhar com layers
- Não iremos implementar um "front-end" para nosso projeto
- Iremos aplicar os conceitos e técnicas de TDD, BDD e Testes unitários já vistos

### Mão na massa

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

### - Libs

- Faker
  - É uma lib para geração de dados de forma automatica e randomizada
  
---

## Projeto Fnal - TDD & BDD - Parte 02

- Vamos primeiro criar as camadas (a nível de estrutura)
- Criamos o diretorio `repository/base` e o arquiv `baseRepository.js`
- Como nosso banco de dados vai ser em arquivo nosso baseRepository vai receber o nome do arquivo sempre que for instanciado e vamos definir o método `find(itemId)`
  - Importando o `readFile` do pacote `fs/promise`
  - No método vamos fazer um `JSON.parse(await readFile(this.file))` no arquivo recebido
  - E retornamos então o objeto obitdo a partir do método `find(({ id }) => id === itemId)` que será realizado sobre o array
  - Lembrando que essa camada está **"simulando"** a integração com o banco de dados já que nosso banco está offiline e em arquivos `.json`
- Seguimos criando o diretório `service` e o arquivo `carService.js` que ira conter as regras de negócios
  - No construtor da classe `CarService` vamos receber um arquivo (já que iremos injetar o baseRepository) e então definir o `carRepository` como uma instancia do `BaseRepository` passando o arquivo recebido no construtor para nova instancia
  - Em seguida criamos um método `test` só para validar a estrutura do projeto, chamando o método `find` do `carRepository`
- Agora dentro do diretório `test` vamos criar a camada de testes unitários definindo um novo diretório `unitTests`
  - Vamos iniciar com o arquivo `carService.test.js`
  - Fazemos a instação das seguintes dependências de desenvolvimento:
    - mocha@8
    - nyc@15
    - sinon@9
  - Copiamos os arquivos de config do nyc e os scripts da aula 04 e ajustamos as estruturas de diretórios, onde for necessário nessas configs
  - Importamos o mocha, descrevemos uma suite de testes para o CarService
  - Criamos um testes inicial somente para validação da estrutura e rodamos
  - E assim temos uma estrutura "ok"
- Agora vamos de fato nossos testes e a implementação dos nossos UseCases
  - Nesse primeiro teste, precisamos pegar um carro disponivel e aletaório de dentro de uma categoria
  - Iniciamo com o método `before` fazendo a instancia do nosso `carService`
  - Importamos o nosso `database` de `CarService` normalizando o path
  - Injetamos o `database` como dependência na instancia do `CarService` como ja era esperado
  - Dessa forma podemos fazer o a chmada do método `test` definido no service e logamos o resultado obtido
  - Podemos então remover esse método pois era exclusivamente didatico e para validação da estrutura do nosso sistema
  - Seguimos definindo o método `getAvailableCar(carCategory)` que vai retornar null inicialmente
  - Importamos o método `assert` do pacote `assert` e vamos definir que o resultado esperado não seja nulo
  - Na sequencia vamos criar os `mocks` começando por criar o diretório `test/mocks` e criando os seguintes arquivos inicialmente:
    - `valid-car.json`
    - `valid-carCategoru.json`
    - `valid-customer.json`
  - Em seguida copiamos e colamos do nosso `database` um exemplo de cada item gerado para nossos respectivos `mocks`
  - Importamos os mocks
  - Um ponto importante é criar uma instancia do `carCategory` utilizando o método `Objet.create()` para termos umas instancia imutavel do objeto em questão, isso por que ao buscar por Id podemos sujar a base de dados e corromper os outros testes já que novamente o objeto é uma instancia e assim podemos modificar o objeto `carCategory` definido pela instancia sem realmente alterar o objeto pai que no caso é o `mock` do `valid-carCategory` importado
  - Inserimos o `car.Id` para dentro do `carCategory.ids`
  - E agora nossa chamamos o método que ira buscar um carro disponivel de acordo com a categoria `carService.getAvailableCar(carCategory)`, conforme previsto no nosso primeiro useCase do `story`
  - Então nosso `expetected` deverá ser a instancia do `mock` logo `expected = car`
  - Como iremos também tratar o `BDD` aqui iremos remover o import do `assert` e em seguida instalar o modulo
    - chai@4
  - Para que nossa asserção seja feita com base no `BDD` deixando o método mais semantico
  - Agora então fazemos a seguinte asserção `expect(result).to.be.deep.equal(expected)`
- Nesse momento vemos que houve um grande erro da nossa parte, não de código, mas sim de pensamente, uma vez que o criterio de aceite estava bem definido mas não implementamos da maneira correta
  - Seguimos então desenvolvendo uma função que pega uma posição randomica de um array (dado a regra de negócio mencionada no criterio de aceite)
  - Então, dado um array devemos retornar a posição aletória de um array ao receber um array
  - Essa função ainda não esta definida no `carService` e veja, aqui sim temos a aplicação do `TDD`, pois estamos pensando em testes antes mesmo da implementação
  - Nossa asserção aqui deverá esperar que o resultado seja menor o igual ao tamanho total do array e maior ou igual que 0, já que nossa função retornara um index do nosso array
  - Agora vamos seguir com a implentação da função, já que nesse caso o teste quebrará e novamente atenderemos ao "padrão" de `TDD`
  - Definimos e implementamos o método `getRandomPositionFromArray(list)`
  - Em seguida vamos definir um outro caso de teste, que é pegar sempre o primeiro `carId` da nossa lista de carros, como um carro valido
  - Definimos então um `carIndex = 0` e o `expected = carCategory.carIds[carIndex]` assim temos que o nosso item esperado é `carCategory.carIds[0]` sendo o primeiro Id do array de `carIds`
  - Definimos e implementamos o método `chooseRandomCar(carCategory)`, onde iremos fazer uso do método `getRandomPositionFromArray` que implementamos e testamos anteriormente
  - E ao rodarmos vemos que o teste não passa, já que a asserção feita `expect(result).to.be.deep.equal(expected)` não foi satisfeita
  - Então devemos colocar um `stub` no método `getRandomPositionFromArray` para que ele sempre retornone `0`
  - Importamos o `sinon` e os métodos necessários para podemos criar o `stub`
  - Dessa vez iremos criar um `sandBox` para que toda vez que um teste for executado as instancias do stub sejam limpas garantindo que não teremos problemas com esse stub em cada rodada de teste
  - Então
    - `beforeEach( () => { sandbox = sinom.createSandbox() })`
  - Em seguida
    - `afterEach(() => sandbox = sinon.createSandbox())`
  - Agora dentro do nosso teste fazemos
    - `sandbox.stunb(carService, carService.getRandomPositionFromArray.name).returns(carIndex)`
  - E rodando o teste, teremos sucesso
  - Já que por baixo dos panos uma `stub` faz a utilização do `spy` e então podemos fazer a seguinte asserção:
    - `expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok`
    - E nosso teste seguirá passando
  - Podemos agora seguir com nosso teste de useCase e ao rodarmos veremos que nosso teste ainda não passará, pois o método não está implementado
  - Seguimos então com a implementação do método `getAvailableCar(carCategory)`, onde iremos gerar um `carId` randomico e depois iremos buscar em nosso banco de dados o carro com `carRepository.find(carId)` e retornar o `car`
  - Salvando nosso teste passará mas ainda não estamos fazendo o teste corretamente, pois o mesmo ainda vai buscar infos no banco de dados e nossos testes não devem depender do banco
  - Para isso fazemos um `stub` do método `getAvailableCar` para que ele retorne o nosso objeto `car` mokcado
  - E adicionamos também um spy ao carService para observar se o método `chooseRandomCar` foi chamado conforme o esperado
  - Fazemos as asserções:
    - `expect(carService.chooseRandomcar.calledOnce).to.be.ok`
    - `expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok`
  - Assim nosso teste seguirá passando

## Projeto Fnal - TDD & BDD - Parte 03

- Iniciamos o desenvolvimento com a classe `Tax` para guardar todas as taxas com base na idade
  
  ```js
    class Tax {
      // get aqui é usado para retornar automaticamente o array
      // ao utilizar o método taxesBasedOnAge().get()
      static get taxesBasedOnAge() {
        return [
        { from 18, to: 25, then: 1.1 },
        { from 26, to: 30, then: 1.5 },
        { from 31, to: 100, then: 1.3 },
      ]
      }
    }

    module.exports = Tax
  ```

- Seguindo para nossa suite de testes, vamos inserir mais um teste para calcular o valor do seguro dado um `carCategory`, o `customer` e o `numberOfDays`

  ```js
  [...]
    it('given a carCategory, customer and numberOfDays it should calculate final amount in R$', async() => {
      // Lembrando que de utilizar Object.create caso seja necessário alterar o mock sem suja-lo
      const customer = Object.create(mocks.validCustomer)
      customer.age = 50

      const carCategory = Object.create(mocks.validCarCategory)
      carCategory.price = 37.6

      const numberOfDays = 5

      // Movido para o carService, como propriedade
      // Aqui iremos utilizar a API de localization nativa do node
      // para formatar a saida em R$ como especificado 
      // const expected = new Intl.numberFormat('pt-br', {
      //   style: 'currency',
      //   currency: 'BRL'
      // }).format(244.40)
      //console.log('expected: ', expected)

      // Não depender de dados externos (ou mudança de classe)
      sandBox.stub(
        carService,
        "taxesBasedOnAge"
      ).get(() => [{ from: 40, to:50, then: 1.3 }])

      const expected = carService.currencyFormat.format(244.40)
      const result = carService.caculateFinalPrice(
        customer, 
        carCategory, 
        numberOfDays
      )

      // Aqui como esperado pelo TDD, nesse momento o teste vai falhar
      // Pois não há ainda a implementação do método calculateFinalPrice()
      expect(result).to.be.deep.equal(expected)
    })
  ```

- Vamos seguir agora para implementação do método que faz o calculo do valor final `calculateFinalPrice()` no arquivo `carService.js`

```js
  [...]
  // É preciso injetar a classe Tax criada anteriormente nessa classe
  // Para que possamos buscar a taxa de acordo com a idade do usuário recebido
  calculateFinalPrice(customer, carCategory, numberOfDays) {
    const { age } = customer
    const { price } = carCategory.price
    // Aqui estamos "apelidando" o then como "tax"
    const { then: tax } = this.taxesBasedOnAge.find(tax => age >= tax.from && age <= tax.to)

    //console.log('then: ', then)

    const finalPrice = ((tax * price) * (numberOfDays))
    const formattedPrice = this.currencyFormat.format(finalPrice)

    return formattedPrice
  }
```

- Seguimos agora para o terceiro user history
- Começamos com a criação do caso de testes implementando:

  ```js
    ...

    it('given a customer and a car category it should return a transaction receipt'm async () =>{
      const Transaction = require("./../../entities/transaction")
      ...
      const car = mocks.validCar
      // Rest spread
      // Outra forma de não sujar o mock e criar um objeto 100% novo
      const carCategory =  {
        ...mocks.validCarCtegory,
        price: 37.6,
        carIds: [car.Id]
      }
      const customer = Object.Create(mocks.validCustomer)
      custumer.age = 20
      
      const numberOfDays = 5
      const dueDate = "10 novembro de 2020"

      // Precisamos mockar o comportamento do JS
      // Para que quando fizermos a instancia de uma nova data sempre retorne uma data padrão
      // Lembrando que no array de datas do JS o mes começa em 0
      const now = new Date(2020,10,5)
      sandbox.useFakeTimers(now.getTime())

      // Para validar o comportamento mockado
      //console.log("now 01: ", now)
      // console.log("now 01: ", new Date())
      
      // Montando uma data teste com a API de datas do JS
      // const today = new Date()
      // const options = {
      //   year: "numeric",
      //   month: "long",
      //   day: "numeric"
      // }

      // console.log('today: ', today.toLocaleDateString("pt-br", options))

      // age: 20, tax: 1.1, categoryPrice: 37.6
      // 37.6 * 1.1 = 41.36 * 5 days = 206.8
      sandbox.stub(
        carService.carRepository,
        carService.carRepository.find.name
      ).resolves(car)

      const expectedAmout = carService.currencyFormat.format(206.8)
      const result = await carService.rent(
        customer, carCategory, numberOfDays
      )

      const expected = new Transaction({
        customer,
        car,
        dueDate,
        amout: expectedAmout
      })

      expect(result).to.be.deep.equal(expected)

    })
  ```

- Na sequencia vamos criar a classe `Transaction` para que nosso "recibo" seja feito da forma adequada
- A implementação fica:

  ```js
    class Transaction {
      constructor({ customer, car, amout, dueDate }) {
        this.customer = customer
        this.car = car
        this.amout = amout
        this.dueDate = dueDate
      }
    }

    module.exports = Transaction
  ```

- Agora na classe service e implementar o método `rent()`

  ```js
    const Transaction = require('./../entities/transcation')
    ...
    async rent(customer, carCategory, numberOfDays) {
      const car = await this.getAvaiableCar(carCategory)
      const finalPrice = await this.caculateFinalPrice(customer, carCategory, numberOfDays)

      const today = new Date()

      today.setDate(today.getDate() + numberofDays)
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
      }
      const dueDate = today.toLocaleDateString("pt-br", options)

      const transaction = new Transcation({
        customer,
        dueDate,
        car,
        amaount = finalPrice
      })

      //console.log(transaction)

      return transaction
    }
  ```

- Rodando o comando `test:cov` vemos que não obtivemos `100%` de teste
- Isso se da pq a classe base dos repositories é uma classe abastrata e geralmente uma classe abstrata não tem uma implementação geral e acabamos não testando diretamente, pois testamos as classes que herdam ela
- Então ou podemos desconsiderar esses casos, ou então implementar um caso de teste
- Mas como já fizemos a implementação da classe concreta, vamos desconsidera-lo
- No arquivo `.nycrc.json` adicionamoms a seguinte linha:
  
  ```json
    ...
    "exclude": ["src/repository/base/*.js"]
  ```

- Novamente por ser uma classe abstrata estamos removendo do covarege pois devemos testar as classes que utilizam ela
- Rodando de o comando `teste:cov` novamente veremos uma cobertura de `100%` como esperado