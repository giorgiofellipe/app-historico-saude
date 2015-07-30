/**
 * MedicacaoController
 *
 * @description :: Server-side logic for managing medicacaos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  data: {
    type: 'datetime',
    required: true
  },
  classificacao: {
    type: 'integer',
    required: true
  },
  eficacia: {
    type: 'integer',
    required: true
  },
  nomeMedicamento: {
    type: 'string',
    required: true
  },
  posologia: {
    type: 'string',
    required: true
  },
  filho: {
    model: 'filho',
    required: true
  }
};

