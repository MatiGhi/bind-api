'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const aConfig = require('../config/config');
const userService = require('../services/userService');
// const loggerService = require('./../services/loggerService');

exports.authenticated = (req, res, next) => {
    var usuario = null;

    console.log(req.headers.authorization);

    if(!req.headers.authorization) {
        return res.status(403).send({
            message: 'La peticion no tiene la cabecera de autenticación'
        });
    }

    let token = req.headers.authorization.replace(/['"]+/g, '');
    let existe_bearer = token.search('Bearer');

    if(existe_bearer != 1) {
        token = token.replace('Bearer ', '');
    } else {
        return res.status(403).send({
            message: 'Token incorrecto'
        });
    }

    try {
        var payload = jwt.decode(token, aConfig['key']);
        if(payload.exp <= moment().unix()){
            return res.status(403).send({
                message:'El token ha expirado'
            });
        }
    } catch(ex) {

        return res.status(403).send({
            message: 'Token incorrecto'
        });
    }

    usuario = userService.getUserById(payload.sub);
    req.usuario = usuario;

    // console.log({payload});
    next();

}
