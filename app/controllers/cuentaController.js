'user strict'

let validator = require('validator');
let usuarios = require('../assets/usuarios.json');
let aConfig = require('./../config/config');
let jwt = require('../services/jwt');
let request = require('request');

let controller = {
    cbu: (req, res) => {
        var cbu = req.params.cbu_cvu;

        // console.log(cbu);

        var body = req.body;

        // console.log(body);

        try {
            var validate_cbu = validator.isEmpty(cbu);
        } catch (error) {
            return res.status(400).send({
                message: 'Falta enviar datos',
            });
        }

        if (validate_cbu){
            return res.status(400).send({
                message: 'Los datos son incorrectos',
            })
        }

        let options = {
            'method': 'GET',
            'url': aConfig['base_url_bind']+'/accounts/cbu/'+cbu,
            'headers': {'Content-Type' : 'application/json', 'Authorization': 'JWT eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1WVdTRmZ6TGp0QWtiL213UVkyZHZJalJDbDhaKzU4bktJMDIxRWliQXVZPSIsImNyZWF0ZWQiOjE2MzMxMDE4MjA3NjMsIm5hbWUiOiJNYXRpYXMgR2hpZ2xpb25lIiwiZXhwIjoxNjMzMTMwNjIwfQ.cPqGpF-fhlzKMClc2WnldAxjr9zxCYY9FgqiAStsbsESZtVrdBE0Ale8EBEiVl6GzllIYZJkFWEuq1DANSpblA'}
        }

        // return res.status(200).send(options)

        request(options, (error, response) => {
            if (error) {
                res.status(response.statusCode).send({
                    data: error,
                });
            } else {

                if(response.statusCode >= 400){
                    res.status(response.statusCode).send({
                        data: response.body
                    });
                } else {
                    res.status(response.statusCode).send({
                        data: JSON.parse(response.body)
                    });
                }
            }
        });

    }
}

module.exports = controller;