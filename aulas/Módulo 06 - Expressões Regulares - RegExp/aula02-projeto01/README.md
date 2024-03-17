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
- Agora podemos receber o texto a partir do tratamento do binario da seguinte forma:

  ```js
  const data = await pdf(dataBuffer)
  ```
  
- Logando `data` teremos além do pdf parseado para string, algumas outras informações

**CONTINUAR de 05:00**
  
---
