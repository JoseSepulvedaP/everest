require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// Se aceptan solo peticiones GET y POST desde front http://localhost:4200
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.APP);
    res.header('Access-Control-Allow-Headers', 'token, Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET', 'POST');
    res.header('Allow', 'GET', 'POST');
    next();
});

app.use(require('./routes/captcha'));

mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor Online en puerto ${process.env.PORT}`);
});

module.exports = app;