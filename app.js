'use strict'

//SERVICIOS BIND: Consulta cuenta por CBU ó CVU, Realizar transferencia y Obtener Transferencia. 

//Requires

var express = require('express');
var bodyParser = require('body-parser');
var aConfig = require ('./app/config/config');

var app = express();

//Seteo la configuracion
app.set('settings', aConfig);

//Exporto la configuracion
app.locals.settings = app.get('settings');

//Cargar las rutas
let apiRoutes = require('./routes/routes');

//Tamaño maximo de la url y los parametros
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

//Obtener los parametros de los verbos HTTP
app.use(bodyParser.json());

//Configuracion cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE, PATCH');
    next();
});

//Agrego el prefijo API a las rutas
app.use('/api', apiRoutes);

//Exportar el modulo
module.exports = app;


