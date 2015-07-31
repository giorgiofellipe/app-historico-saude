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
        if (pessoa) {
          Usuario.findOne({id: pessoa.usuario}).exec(function findOneCB(err, usuario){
            if (err) {
              return res.json({error: true, message: err});
            }
            if (usuario) {
              if (usuario.senha == formSenha) {
                usuario.senha = null;
                return res.json(usuario);
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
  },
  filhos: function (req, res) {
    var user = req.param("user");
    console.log(user);
    if (user) {
      Filho.find().where({usuario: user}).exec(function findCB(err, filhos){
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

