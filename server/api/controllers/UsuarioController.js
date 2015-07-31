/**
 * UsuarioController
 *
 * @description :: Server-side logic for managing usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  login: function (req, res) {
    var formEmail = req.param("email");
    var formSenha = req.param("senha");
    if (formEmail && formSenha) {
      console.log("+ AUTH.LOGIN email=", formEmail, "password=", formSenha);
      Pessoa.findOne({email:formEmail}).exec(function findOneCB(err, pessoa){
        console.log('We found '+ pessoa.usuario);
        if (pessoa) {
          Usuario.findOne({id: pessoa.usuario}).exec(function findOneCB(err, usuario){
            if (err) {
              return res.json({error: true, message: err});
            }
            if (usuario) {
              if (usuario.senha == formSenha) {
                return res.json(true);
              } else {
                return res.json(false);
              }
            } else {
              return res.json(false);
            }
          });
        } else {
          return res.json(false);
        }
      });
    } else {
      console.log("+ AUTH.LOGIN (empty credentials)");
      return res.json(false);
    }
  }
};

