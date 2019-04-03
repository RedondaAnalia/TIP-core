let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();
let userRoutes = require("./api-route/user-routes")
let petRoutes = require("./api-route/pet-routes")
let appRoutes = require('./api-route/app')

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

mongoose.connection.openUri('mongodb://localhost:27017/petHeroesDB',(err,res) => {
    if ( err ) throw err;

    console.log('BBDD: \x1b[32m%s\x1b[0m', 'online');
});

//app.use('/users', userRoutes);

app.use('/', appRoutes)
app.use('/users', userRoutes)
app.use('/pets', petRoutes)

app.listen(3000, ()=> {
    console.log('Express Server puerto 3000: \x1b[32m%s\x1b[0m', 'online')
});