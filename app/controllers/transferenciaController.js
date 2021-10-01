'user strict'

let validator = require('validator');
let aConfig = require('./../config/config');
let jwt = require('../services/jwt');
let request = require('request');

let controller = {
    realizar_transferencia: (req, res) => {
        
        var params = req.body;
        var bank_id = req.params.bank_id;
        var account_id = req.params.account_id;
        var view_id = req.params.view_id;

        try {

            var validate_cbu = validator.isEmpty(params.to.cbu);
            console.log('validate_cbu: ', validate_cbu);
            var validate_value = Object.keys(params.value).length > 0 ? true : false;
            console.log('validate_value: ',validate_value);
            var validate_currency = false;
            var validate_amount = false;
            var validate_description = validator.isEmpty(params.description);
            console.log('validate_description', validate_description);
            var validate_concept = validator.isEmpty(params.concept);
            console.log('validate_concept: ', validate_concept);
            var validate_emails = params.emails.length > 0 ? true : false;
            console.log('validate_emails: ', validate_emails);
    
            console.log('validate_value: ', validate_value);

            if (validate_value) {
                if (params.value.amount != undefined ) {
                    validate_amount = true;
                } 

                console.log('currency: ', params.value.currency);

                if (params.value.currency != undefined) {
                    validate_currency = validator.isLength(params.value.currency, {min: 1, max: 3});
                }

            }

            if (validate_emails) {
                console.log('Entro a la validacion de email');
                for (let i = 0; i < params.emails.length; i++){
                    if(!validator.isEmail(params.emails[i])) {
                        console.log(params.emails[i]);
                        validate_emails = false;
                    };
                }
            }


        } catch (err){
            return res.status(400).send({
                message: 'Faltan datos por enviar',
            })
        }

        if (validate_cbu || !validate_value || !validate_currency || !validate_amount || validate_description || validate_concept || !validate_emails){
            return res.status(400).send({
                message: 'los datos son incorrectos'
            })
        }

        let parametrosCrearTransferencia = 
        {
            "to": {
                "cbu": params.to.cbu,
            },
            "value": {
                "currency": params.value.currency,
                "amount": params.value.amount
            },
            "description": params.description,
            "concept": params.concept,
            "emails": params.emails
        }

        let options = {
            'method':'POST',
            'url': aConfig['base_url_bind']+'/banks/'+bank_id+'/accounts/'+account_id+'/'+view_id+'/transaction-request-types/TRANSFER/transaction-requests',
            'headers': {'Content-Type' : 'application/json','Authorization': 'JWT eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1WVdTRmZ6TGp0QWtiL213UVkyZHZJalJDbDhaKzU4bktJMDIxRWliQXVZPSIsImNyZWF0ZWQiOjE2MzMxMDE4MjA3NjMsIm5hbWUiOiJNYXRpYXMgR2hpZ2xpb25lIiwiZXhwIjoxNjMzMTMwNjIwfQ.cPqGpF-fhlzKMClc2WnldAxjr9zxCYY9FgqiAStsbsESZtVrdBE0Ale8EBEiVl6GzllIYZJkFWEuq1DANSpblA' },
            body: JSON.stringify(parametrosCrearTransferencia)
        }

        // return res.status(200).send(options);

        request(options, (error, response) => {

            if(error) {
                res.status(response.statusCode).send({
                    data: error,
                });
            } else {
                if (response.statusCode >= 400){
                    res.status(response.statusCode).send({
                        data: JSON.parse(response.body)
                    })
                } else {
                    res.status(response.statusCode).send({
                        data: JSON.parse(response.body)
                    });
                }
            }
        });
    },

    obtener_transferencia: (req, res) => {
        var  params = req.params;

        var bank_id = params.bank_id;
        var account_id = params.account_id;
        var view_id = params.view_id;
        var transaction_id = params.transaction_id;

        try {
            var validate_bankID = validator.isEmpty(bank_id);
            var validate_accountID = validator.isEmpty(account_id);
            var validate_viewID = validator.isEmpty(view_id);
            var validate_transactionID = validator.isEmpty(transaction_id);

        } catch (err) {
            return res.status(400).send({
                message: 'Faltan Datos por Enviar!',
            });
        }

        if(validate_bankID || validate_accountID || validate_viewID || validate_transactionID){
            return res.status(400).send({
                message: 'Los datos son incorrectos',
            })
        }


        let options = {
            'method':'GET',
            'url': aConfig['base_url_bind']+'/banks/'+bank_id+'/accounts/'+account_id+'/'+view_id+'/transaction-request-types/TRANSFER/'+transaction_id,
            'headers': {'Content-Type' : 'application/json','Authorization': 'JWT eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1WVdTRmZ6TGp0QWtiL213UVkyZHZJalJDbDhaKzU4bktJMDIxRWliQXVZPSIsImNyZWF0ZWQiOjE2MzMxMDE4MjA3NjMsIm5hbWUiOiJNYXRpYXMgR2hpZ2xpb25lIiwiZXhwIjoxNjMzMTMwNjIwfQ.cPqGpF-fhlzKMClc2WnldAxjr9zxCYY9FgqiAStsbsESZtVrdBE0Ale8EBEiVl6GzllIYZJkFWEuq1DANSpblA' },
        }

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

};

module.exports = controller;