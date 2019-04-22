const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

//Se agregan parsers para API
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const variables_env = require('./config/config-module.js').config()
var PORT = 3000;
var MONGURI = "mongodb://localhost:27017/petHeroesDB_dev";

if(variables_env){
    PORT = variables_env.PORT;
    MONGURI = variables_env.MONGURI;
    console.log('---------------->>>>>>' + PORT)
}

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

//Conexion con BBDD
mongoose.connection.openUri(MONGURI,
        (err,res) => {
                if ( err ) throw err;
                console.log('BBDD: \x1b[32m%s\x1b[0m', 'online');
        }
);


//Definicion de rutas.
//app.use('/users', userRoutes);
let applicationRoutes = require("./api-route/application-routes");
let vaccineRoutes = require("./api-route/vaccine-routes");
let userRoutes = require("./api-route/user-routes");
let loginRoutes = require("./api-route/login-routes");
let petRoutes = require("./api-route/pet-routes");
let appRoutes = require('./api-route/app');

app.use('/applications', applicationRoutes);
app.use('/vaccine', vaccineRoutes);
app.use('/login', loginRoutes);
app.use('/users', userRoutes);
app.use('/pets', petRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', appRoutes);

//Designacion de puerto por donde escucha la app.

module.exports = app.listen(process.env.PORT || PORT ||5000 , ()=> {
    console.log(`Express Server puerto ${PORT || 3000}: \x1b[32m%s\x1b[0m`, 'online');
});
