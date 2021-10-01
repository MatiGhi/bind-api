'user strict'

let validator = require('validator');
let usuarios = require('../assets/usuarios.json');
let aConfig = require('./../config/config');
let jwt = require('../services/jwt');

let controller = {

    login: (req,res) => {
        var params = req.body;
        // console.log(params); return true;

        try {

            //Validacion de Datos
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
            var validate_password = !validator.isEmpty(params.password);

        } catch(ex){
            return res.status(400).send({
                message: 'Faltan datos por enviar'
            });
        }

        if(!validate_email || !validate_password) {
            // if(!validate_email){

            // } 
            // if(!validate_password){

            // }

            return res.status(400).send({
                message: 'Los datos son incorrectos'
            });
        }

        for(let i = 0; i < usuarios.values.length; i++) {
            if(usuarios.values[i].email === params.email && usuarios.values[i].password === params.password) {
                var usuario = usuarios.values[i];
            }
        }

        console.table(usuario);

        if (usuario != null) {
            let token = jwt.createToken(usuario);
            //loggerService.log_error('Creacion token correcta: + token');
            return res.status(200).send({
                token
            });
        } else {
            //loggerService.log_error('Las credenciales son incorrectas en: '+aConfig['host']+/'api'+req.route.path);
            return res.status(400).send({
                message: 'Las credenciales son incorrectas'
            })
        }
    }
};

module.exports = controller;