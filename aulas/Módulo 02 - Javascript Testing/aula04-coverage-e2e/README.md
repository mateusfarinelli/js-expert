# Testes End To End (E2E)

- Prática E2E
- Prática de cobertura de testes e autoamtização de comandos
- Aplicações que ja funcionam e não tem nenum teste é importante garantir pelo menos as funcionalidades e pra isso utilizamos testes E2E

## O que foi feito?

- Incialmente criamos o arquivo que simulará um projeto já existente
- Vamos utilizaro curl (talvez no windows seja necessário isntalar)
- Definimos a função handler, que inicialmente irar printar somente um "Ok"
- Criamos a instancia do app, que ouvirá a porta 3000, que logará uma mensagem de servidor rodando na porta 3000, e que irá chamar a função handler quando receber alguma requisição na porta
- Fazemos a desestruturação das props `url` e `method` do `request` e definimos a variavel `routeKey` concatenando `url` e `metodo`
- Em seguida começamos definir nossas rotas, dentro de uma variavel chamada `routes` no esquema de objeto, passando a rota como chave e função a ser executada como valor daquela rota
- Em seguida definimos também a variavel `chosen` que será responsavel por executar a rota recebida
- Definimos também um método `default` que retornará um `404` com a mensagem "not found"
- E na variavel chosen fazemos uma validação para caso não seja encontrado a rota retornar o default
- Agora definimos a rota `login:post` que receberá a request e fará a extração dos dados a partir do método `once` da lib `events`
- Fazemos a implementação de lógica para validar os dados do login e seguimos com `401` e a mensagem "Loggin failed"

## Vamos partir para os testes

- Inciamos instalando o mocha
- Definimos o script para execução de nossos testes
- Fazemos a importação dos métodos `describe` e `it`, por mais que o mocha faz isso de forma globalmente, não é uma boa pratica, pois acabamos não vendo de onde o método está vindo
- Em seguida definimos a nossa suite de testes
- Seguimos com a definição do método de teste para página de contato
- Exportamos e importamos o `app`
- Instalamos e importamos a lib supertest
- Seguimos então com a implementação do teste para buscar o contato de forma assincrona
- Como estamos executando em modo watch, vamos iniciar o app antes de tudo e mata-lo ao fim da suite de teste
- Em seguida vamos implantar o teste para login

## E quem garante que essa bagaça foi realmente testada?

- Vamos utilizar o stambul para metrificar nossa cobertura de testes e garantir que temos de fato essa garantia
- Definimos o script de coverage
- E fazemos uma primeira varredura
- Vamos então ser alertados de que as linhas *29-30* não foram testadas
- Essas linhas são referentes a rota default que retorna um `404`
- Vamos inicialmente criar um arquivo de configuração, e definimos algumas propriedades como valor `100` e na prop `reporter` vamos passar os valores `"xml", "text"` para que possamos ter visibilidade do resultado da coverage dentro de um xml que nos da mais visibilidade sobre a cobertura além de algumas ferramentas
- Implementamos o teste faltante e rodamos novamente o script de coverage e como resultamos temos um coverage de 100% como definimos no arquivo de configuração

**NOTA: CHAMADAS EXTERNAS, BANCO DE DADOS E ARQUIVOS DEVEM SER MOCADOS**
