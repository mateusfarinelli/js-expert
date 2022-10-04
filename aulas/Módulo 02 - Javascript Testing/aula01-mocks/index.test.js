const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');

(async() => {
  {
    const filePath = './mocks/emptyFile-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }

  {
    const filePath = './mocks/fourItems-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }

  {
    const filePath = './mocks/invalid-header.csv';
    const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }

  {
    Date.prototype.getFullYear = () => 2020
    const filePath = './mocks/threeItems-valid.csv';

    /**
     * Como aqui espero que não rejeite, eu quero receber de fato o resultado
     * por isso utilizamos o "await" para resolver a promisse aqui,
     * e nos escopos anteriores não utilizava-mos.
     */

    const result = await File.csvToJson(filePath);
    const expected = [
      {
        "name": "Erick Wendel",
        "id": 123,
        "profession": "Javascript Instructor",
        "birthDay": 1995 
      },
      {
        "name": "Xuxa da Silva",
        "id": 321,
        "profession": "Javascript Specialist",
        "birthDay": 1940
      },
      {
        "name": "Mateusinho",
        "id": 231,
        "profession": "JS Developer",
        "birthDay": 1990
      }
    ]

    /**
     * Como criamos uma classe para padronizar nosso objeto
     * temos que agora fazer um "stringfy" do resultado e do expected,
     * se não estaremos comparado um objeto literal, com um
     * objeto criado a partir de uma classe
     */
    await deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }

})()