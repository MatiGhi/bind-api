'use strict'

let express = require('express');
const route = require('../app');
const middleware = require('../app/middlewares/authenticated');
let router = express.Router();

let apiController = require('../app/controllers/apiController');
let autenticacionController = require('../app/controllers/autenticacionController');
let cuentaController = require('../app/controllers/cuentaController');
let transferenciaController = require('../app/controllers/transferenciaController');

//LOGIN
router.post('/login', apiController.login);

router.post('/v1/login/jwt', middleware.authenticated, autenticacionController.login);

//CBU
router.get('/v1/accounts/cbu/:cbu_cvu', middleware.authenticated, cuentaController.cbu);

//REALIZAR TRANSFERENCIA
//router.post('/v1/banks/:bank_id/accounts/:account_id/:view_id/transaction-request-types/TRANSFER/transaction-requests', middleware.authenticated, transferenciaController.realizar_transferencia);
router.post('/v1/banks/:bank_id/accounts/:account_id/:view_id/transaction', middleware.authenticated, transferenciaController.realizar_transferencia);
//https://sandbox.bind.com.ar/v1/banks/:bank_id/accounts/:account_id/:view_id/transaction-request-types/TRANSFER/transaction-requests

//OBTENER TRANSFERENCIA
router.get('/v1/banks/:bank_id/accounts/:account_id/:view_id/transaction-request-types/TRANSFER/:transaction_id', middleware.authenticated, transferenciaController.obtener_transferencia);
//https://sandbox.bind.com.ar/v1/banks/:bank_id/accounts/:account_id/:view_id/transaction-request-types/TRANSFER/:transaction_id


module.exports = router;