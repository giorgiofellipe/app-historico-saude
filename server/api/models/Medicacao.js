/**
* Medicacao.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    data : { type: 'datetime' },

    nomeMedicamento : { type: 'string' },

    posologia : { type: 'string' },

    eficacia : { type: 'integer' }
  }
};

