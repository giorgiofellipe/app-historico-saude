/**
* Filho.js
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
    alturaNascimento: {
      type: 'float',
      required: true
    },
    dataHoraNascimento: {
      type: 'datetime',
      required: true
    },
    foto: {
      type: 'string'
    },
    localNascimento: {
      type: 'string',
      required: true
    },
    madrinha1: {
      type: 'string'
    },
    madrinha2: {
      type: 'string'
    },
    padrinho1: {
      type: 'string'
    },
    padrinho2: {
      type: 'string'
    },
    pesoNascimento: {
      type: 'float',
      required: true
    },
    sexo: {
      type: 'integer',
      required: true
    },
    signo: {
      type: 'integer',
      required: true
    },
    usuario: {
      model: 'usuario',
      required: true
    }
  }
};

