let express = require('express');
let app = express();

//Se agregan parsers para API
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

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
mongoose.connection.openUri('mongodb://localhost:27017/petHeroesDB',
        (err,res) => {
                if ( err ) throw err;
                console.log('BBDD: \x1b[32m%s\x1b[0m', 'online');
        }
);

//Definicion de rutas.
//app.use('/users', userRoutes);
let applicationRoutes = require("./api-route/application-routes")
let vaccineRoutes = require("./api-route/vaccine-routes")
let userRoutes = require("./api-route/user-routes")
let petRoutes = require("./api-route/pet-routes")
let appRoutes = require('./api-route/app')

app.use('/applications', applicationRoutes);
app.use('/vaccine', vaccineRoutes);
app.use('/users', userRoutes);
app.use('/pets', petRoutes);
app.use('/', appRoutes);

//Designacion de puerto por donde escucha la app.
app.listen(3000, ()=> {
    console.log('Express Server puerto 3000: \x1b[32m%s\x1b[0m', 'online')
});