/**
* Alergia.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	dataPrimeiraOcorrencia: {
      type: 'datetime',
      required: true
    },
    componenteAlergico: {
      type: 'string',
      required: true
    },
    sintomas: {
      type: 'string',
      required: true
    },
    antidoto: {
      type: 'string',
      required: true
    },
    filho: {
      model: 'filho',
      required: true
    }
  }
};

