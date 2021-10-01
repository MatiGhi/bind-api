'use strict'

let jwt = require('jwt-simple');
let moment = require('moment');
let aConfig = require('../config/config');

exports.createToken = (usuario) => {

    var payload = {
        sub: usuario.id,
        nombre: usuario.name,
        email: usuario.email,
        iat: moment().unix(),
        exp: moment().add(1, 'day').unix() 
    };
    console.table(payload);
    return jwt.encode(payload, aConfig['key']);

};