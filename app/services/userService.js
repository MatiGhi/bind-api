'use strict'

var usuarios = require('../assets/usuarios.json')

exports.getUserById = (userId) => {

    var usuario = null;

    for(let i = 0; i < usuarios.values.length; i++) {
        if(usuarios.values[i].id === userId){
            usuario = usuarios.values[i];
        }
    }

    return usuario.apiKey;

}