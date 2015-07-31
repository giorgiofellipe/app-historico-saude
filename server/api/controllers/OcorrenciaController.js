/**
 * OcorrenciaController
 *
 * @description :: Server-side logic for managing Ocorrencias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findByUser: function(req,res) {
    var user = req.param("user");
    console.log(user);
    if (user) {
      Filho.find().where({usuario: user}).exec(function findCB(err, filhos){
        if (err) {
          return res.json({error: true, message: err});
        }
        if (filhos) {
          var filhosId = new Array();
          for (var i in filhos) {
            filhosId.push(filhos[i].id);
          }
          Ocorrencia.find({filho: filhosId}).exec(function findCB(error, doencas){
            if (error) {
              return res.json({error: true, message: error});
            }
            if (doencas) {
              return res.json(doencas);
            } else {
              return res.json([]);
            }
          });
        } else {
          return res.json([]);
        }
      });
    } else {
      return res.json({error: true, message: 'No user passed'});
    }
  }
};

