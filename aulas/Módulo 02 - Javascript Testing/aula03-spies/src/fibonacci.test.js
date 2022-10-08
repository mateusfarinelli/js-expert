const Fibonacci = require("./fibonacci");
const sinon = require('sinon');
const assert = require('assert');

/**
 * Termo largamente utilizado na matematica para descrever um numero
 * infinito, onde cada termo é representado pela soma dos dois
 * numeros anteriores.
 * 
 * Ex: dado 3 nossa função retornará os numeros [0,1,1] sendo 011
 * a sequencia fibonacci de "comrpimento 3"
 * 
 * Ex: dado 5 nossa função retornará os números [0, 1, 1, 2, 3]
 * 
 * E assim por diante
 */
(async () => {
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);

    const CHAMADAS = 3;
    //generators retornam iterators, (.next)
    // exustem 3 formas de ler os dados
    // usando funções .next, for await (iteradores assincronocos) e rest/spread
    for await(const i of fibonacci.execute(CHAMADAS)) {}

    /**
     * Nosso algoritimo sempre começará do 0, logo esperamos
     * que o valor expectedCallCount seja sempre CHAMADAS+1
    */
    const expectedCallCount = CHAMADAS+1;

    assert.deepStrictEqual(spy.callCount, expectedCallCount);

    // console.log("callcount", spy.callCount);
  }

  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, fibonacci.execute.name);
    const [...results] = fibonacci.execute(5);

    // [0] input = 5, current = 0; next = 1
    // [1] input = 4, current = 1; next = 1
    // [2] input = 3, current = 1; next = 2
    // [3] input = 2, current = 2; next = 3
    // [4] input = 1, current = 3; next = 5
    // [5] input = 0 => PARA

    const { args } = spy.getCall(2);
    const expectedResult = [0, 1, 1, 2, 3]
    const expectedParams = Object.values({
      input: 3,
      current: 1,
      next: 2
    });

    assert.deepStrictEqual(args, expectedParams);
    assert.deepStrictEqual(results, expectedResult);
  }
}) ()