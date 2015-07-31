/**
* Medicacao.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    data : { type: 'datetime' , required: true},

    nomeMedicamento : { type: 'string' ,required: true},

    posologia : { type: 'string' ,required: true},

    eficacia : { type: 'integer' ,required: true},

    classificacao : { type: 'integer' ,required: true},

    valor : { type: 'float' ,required: true},

    principioAtivo : { type: 'string',required: true },

    filho: {
      model: 'filho',
      required: true
    }
  }
};

