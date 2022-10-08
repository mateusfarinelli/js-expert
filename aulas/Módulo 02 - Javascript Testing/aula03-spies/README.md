# Trabalhando com Spies

# O que foi feito?
- Nesta aula criamos uma função geradora (irei explicar maisa frente), que retornava uma sequencia fibonacci de tamanho igual o número passado
como parâmetro.
  - Dessa forma imagine que o numero passado para execução da função fosse 5, ele retornaria o array [0, 1, 1, 2, 3].
- Além disso criamos o arquivo de teste que tinha função de:
  - Validar a quantidade de chamadas, então passando o número "5" para execução, a função deveria ter sido executada 5 vezes até sua pausa.
  - Validar os parâmetros de cada chamda, dessa forma saberiamos ao fim qual seriam os parâmetros passados e também o resultado esperado.

# O que são spies?
- Podemos dizer que spies são "observadores" de uma função, ou seja, ficam observando a função a fim de identificar numero de chamadas, parametros passados
em cada chamada, resultados obitos e outros.
- Então, não podemos confiar somente no valor obtido pela função, o retorno é sem duvidas importante, mas validar o comportamento da função também é.
- *NOTA*: no *JEST* os *SPIES* são basicamente *STUBS*.

# Beleza, mas o que são generators?
- Particularmente não era conhecedor desse tipo de método até ser apresentado no curso. Mas no decorrer do curso iremos ver mais a respeito, portanto,
fica um disclaimer de que minha explicação pode estar errada e muito simplista, mas foi como entendi durante meu estudo.
- Então, um generator, ou generator function, ou gerador (enfim), é um método capaz de retornar um objeto do tipo iterator (irei explicar a frente).
- Um gerador então tem o "poder" de pausar a sua execução e retornar um valor, sem que o método esteja de fato concluido.
  - Então para basicamente temos a indicação de um generator pelo "*" na palavra "function" na assinatura do método.
  - E para que o valor seja retornado sem que o método seja terminado utilizamos o termo reservado "yield" como utilizariamos caso fosse um "return" (este também pode ser utilizado caso seja necessário encerrar as execuções do método).
  - E por fim temos varias formas de receber os valores, seja utilizando um loop como o "for await", ou utilizando operadores do tipo "spread (...)"

# Por fim, o que são iterators?
- Iterators são um tipo de objeto do JS.
- Iterators também permitem iterarmos o objeto (a vá)  utilizando o método ".next()".
- Strings e arrays, são exemplos de tipos primitivos que podem ser convertidos em iterators.