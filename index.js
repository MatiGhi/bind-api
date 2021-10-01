'use strict'

let app = require('./app');

app.listen(app.get('settings').port,() => {
    console.log(`El servidor esta corriendo de manera ${app.get('settings').env} en ${app.get('settings').host}`);
});