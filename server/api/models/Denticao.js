/**
* Denticao.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    data: {
      type: 'datetime',
      required: true
    },
    dente: {
      type: 'integer',
      required: true
    },
    denticao: {
      type: 'integer',
      required: true
    },
    reacoes: {
      type: 'string',
      required: true
    },
    filho: {
      model: 'filho',
      required: true
    }
  }
};

