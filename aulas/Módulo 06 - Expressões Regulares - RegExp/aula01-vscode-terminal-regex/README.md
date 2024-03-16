# Usando ReGex para subistuição de dados em arquivos no VSCode e terminal

## VSCode

### Validando CPFs

- Utilizar `\` para comandos
  - ReGex montada: `^\d{3}.\d{3}.\d{3}-\d{2}$`
  - `d` => `digit`
  - `{}` => `quantifier`
  - `^` => `inicio de string`
  - `$` => `finalizador de string`
  - Ex:
    - <font color="green"> 123.123.123-12</font>
    - <font color="green"> 345.345.345-34</font>
    - <font color="red"> 678.678.678.67</font>

### Replace de caracteres especiais no VSCode

- `[]` => `limitador de caractere unico [abc] => a, b ou c`
- `[.-]` => `carateres . e - serão validados pelo ReGex`
- Se utilizamos o `[.-]` no `find (ctrl + f) ou replace (ctrl + h)` iremos buscar e fazer a subistuição desses caracteres em todo o arquivo

### Transformar CSV em JSON

- ReGex montada: `^(\w+),\s(\w+)$`
  - `\w` =>  `qualquer caractere de plavara (excluindo caracteres especiais)`
  - `+` => `procura por toda condição anterior até não ser mais satisfeita`
  - `\s` => `espaço`
  - `\S` => `Qualquer caracrete que não seja um espaço`
  - `()` => `Construtor de grupo`
- Agora vamos até o VSCode e novamente no `alterar` vamos utilizar o ReGex que foi montado e fazer com que os exemplos abaixo sejam transformados em uma estrutura de dados em formato `json`, utilizando uma regra em que:
  - O grupo `$0` é toda a string e os grupos separados são dados por `$n` no nosso exemplo n = 1 e n = 2 logo teremos a seguinte formatação:
    - `{fisrtName: "$2", lastName: "$1"}`
    - O dado inputado é:
      - Farinelli, Mateus
      - Magalhaes, Juliana
    - A o retorno após o replace é:

      ```json
      {fisrtName:"Mateus", lastName:"Farinelli"}
      ```

      ```json
      {fisrtName:"Juliana", lastName:"Magalhaes"}
      ```

### Transformar link MD para HTML

- ReGex montada: `\[(.*?)\]\(([http|https].*?)\)`
  - `\` => `pesquisa literal`
  - `.*` => `wild card, ou coringa, pega tudo`
  - `?` => `limitador non read`
  - `|` => `condicional`
- Faremos o replace utilizando o seguinte padrão:
  - `<a href="$2">$"1"</a>`
- Ex:
  - Entrada:

     ```markdown
    O [Erick Wendel](https://erickwendel.com) faz palestras e você devia segui-lo no [Twitter](http://twitter.com/erickwendel_) ou até no [Instagram](https://instagram.com/erickwendel_)

    Ah e pode pesquisar no [Google](https://google.com) ou [Yahoo](https://yahoo.com)
    
    vai que vai!
    ```

  - Saida:

    ```htm
    O <a href="https://erickwendel.com">"Erick Wendel"</a> faz palestras e você devia segui-lo no <a href="http://twitter.com/erickwendel_">"Twitter"</a> ou até no <a href="https://instagram.com/erickwendel_">"Instagram"</a>
    
    Ah e pode pesquisar no <a href="https://google.com">"Google"</a> ou <a href="https://yahoo.com">"Yahoo"</a>
    
    vai que vai!
    ```

---

## Terminal

## Pesquisar todos os arquivos que possuem no nome o padrão ".test.js"

- Criamos o arquivo `regex-terminal.sh`
- Adicionamos a seguinte linha de código 
  - `find . -name *.test.js`
- Isso faz com que percorramos dentro da raiz (diretório em que se encontra o terminal no momento da execução do comando)
- Para ignorar arquivos da node_modules por exemplo podemos passar um outro comando
  - `find . -name *test.js -not -path '*node_modules**'`
- Instalamos a lib `ipt => npm i -g ipt` que irá nos permitir trabalhar de forma simplificada com os arquivos diretamente na linha de comando
- Criamos um novo comando adicionando os arquivos encontrados para dentro do `ipt`:
  - `find . -name *test.js -not -path '*node_modules**' | ipt`
- Pensamos em que no projeto `aula-o5-tdd-desafio-resolvido` temos que adicionar o `user strcit` por um requisito de negócio empresarial
- Para isso vamos fazer o seguite comando:
  - `CONTENT="'user strict';"`
  - `find . -name *.js -not -path '*node_modules**' | ipt -o`  
- Em sequencia vamos utilizar o parametro `xargs -I` onde poderemos executar um comando customizado para cada item selecionado pelo `ipt`
- Vamos somente logar uma string + o nome do arquivo e para isso acrescentamos ao comando anterior:
  - `| xargs -I '{file}' echo 'ae' {file}`
- Podemos agora remover o echo que passamos e vamos assumir que iremos subistuir na primeira linha `1s` e na primeira coluna `/^` de cada arquivo do nosso projeto pela variavel `CONTENT` definida e no final ainda iremos fazer a quebra de linha, para isso fazemos:
  ```console
  | xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
  /g' {file}
  ```
---

## Links

- [Regex101](https://regex101.com/)
