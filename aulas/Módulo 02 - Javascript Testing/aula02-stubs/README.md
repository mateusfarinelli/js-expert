# Trabalhando com Stubs

# O que foi feito?
- Iniciamos criando o arquivo "src/service.js", responsavel por fazer a chamada HTTP a API do Stware Wars (SWAPI).
- Posteriormente fazemos a validação dessa classe utilizando de clousre, e verificamos então o retorno da API, criando assim nossos mocks "src/mocks/alderaan.json" e "src/mocks/tatooine.json".
- Criamos então o arquivo "service.test.js" recortanto a closure do arquivo "service.js" para este arquivo e então criamos o stub, utilizando a biblioteca "sinon", que por usa vez é a responsavel por facilitar a criação dos stubs para nós.
- Criamos também os casos de teste, passando as informações pertinentes para cada caso.
- E utilizando novamente o módulo "assert" realizamos os testes.

# O que são stubs e por que utiliza-los?
- Podemos definir Stubs como sendo um "canhoto", ou seja, a "inscrição" de um comportamento que fica registrada mas não é totalmente replicada.
  - Vamos lá. Criar um stub significa que o método chamado não realizará o mesmo comportamento, isto é, imagine a chamada HTTP a um serviço/API ou mesmo uma consulta num banco de dados, localmente isso é quase que instantaneo e sem nenhum custo, mas por outro lado, quando estamos lidando com conexões, chamadas e serviços remotos isso já pode não ser mais verdade. Por isso fazemos um "canhoto" do comportamento desse método, que ao ser chamado pelo nosso caso de teste, será "interceptado" e redirecionado para um mock do retorno já conhecido.