/**
* ConsultaMedica.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    dataHora: {
      type: 'datetime',
      required: true
    },
    descricao: {
      type: 'string',
      required: true
    },
    especialidade: {
      type: 'string',
      required: true
    },
    medico: {
      type: 'string',
      required: true
    },
    filho: {
      model: 'filho',
      required: true
    }
  }
};

