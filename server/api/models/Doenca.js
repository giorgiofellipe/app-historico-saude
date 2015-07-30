/**
* Doenca.js
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
    nome: {
      type: 'string',
      required: true
    },
    sintomas: {
      type: 'string',
      required: true
    },
    tratamento: {
      type: 'string',
      required: true
    },
    filho: {
      model: 'filho',
      required: true
    }
  }
};

