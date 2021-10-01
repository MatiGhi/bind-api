'user strict'

let validator = require('validator');
let usuarios = require('../assets/usuarios.json');
let aConfig = require('./../config/config');
let jwt = require('../services/jwt');
let request = require('request');

let controller = {
    login: (req, res) => {
        let params = req.body;

        try {
            var validate_username = validator.isEmpty(params.username);
            var validate_password = validator.isEmpty(params.password);
        } catch(ex) {
            return res.status(400).send({
                message: 'Faltan datos para enviar'
            });
        }

        if(validate_username || validate_password){
            return res.status(400).send({
                message: 'Los datos son incorrectos'
            })
        }

        let parametrosBind = {
            username: params.username,
            password: params.password
        }

        let options = {
            'method': 'POST',
            'url': aConfig['base_url_bind']+'/login/jwt',
            'headers': {'Content-Type' : 'application/json'},
            body: JSON.stringify(parametrosBind)
        };

        request(options, (error, response) => {
            if(error){
                res.status(response.statusCode).send({
                    data: error
                });
            } else {
                res.status(response.statusCode).send({
                    data: JSON.parse(response.body)
                });
            }
        })

    }
};

module.exports = controller;
