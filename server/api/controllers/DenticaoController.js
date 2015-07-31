/**
 * DenticaoController
 *
 * @description :: Server-side logic for managing denticaos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  findByUser: function(req,res) {
    var user = req.param("user");
    console.log(user);
    if (user) {
      Denticao.find().where({usuario: user}).exec(function findCB(err, filhos){
        if (err) {
          return res.json({error: true, message: err});
        }
        if (filhos) {
          return res.json(filhos);
        } else {
          return res.json([]);
        }
      });
    } else {
      return res.json({error: true, message: 'No user passed'});
    }
  }
};

