/**
* Pessoa.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    nome: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    endereco: {
      type: 'string',
      required: true
    },
    bairro: {
      type: 'string',
      required: true
    },
    cidade: {
      type: 'string',
      required: true
    },
    numero: {
      type: 'string',
      required: true
    },
    dataNascimento: {
      type: 'date',
      required: true
    },
    sexo: {
      type: 'integer',
      required: true
    },
    uf: {
      type: 'string',
      enum: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'],
      required: true
    },
    telefone: {
      type: 'string',
      required: true
    },
    usuario: {
      model: 'usuario',
      required: true
    }
  }
};

