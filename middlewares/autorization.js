

const config = require('../config/config');
const userRepository = require('../repository/user.repository');
const VALIDS_ROLES = config.VALIDS_ROLES
exports.onlyVeterinaries= function( req, res, next){
    return userRepository.findByEmail( req.body.email ).then(res=>{
        if( 'VET_ROLE' === res.role) {next();}
        else{

            let error = new Error("No autorizado");
            next(error);
            //NO DEVOLVER ERROR PORQUE ROMPE EL BACKEND(o handlear la exception). Utilizar el res provisto por la primera funcion
            //return res.status(401).bla.......            
        }

    })


    
}
exports.onlyUsers= function( req, res, next){
    const user = userRepository.findByEmail( req.body.email )
    if( 'USER_ROLE' == user.role)
        next();

    let error = new Error("No autorizado");
    next(error);
}
exports.onlyServices= function( req, res, next){
    const user = userRepository.findByEmail( req.body.email )
    if( 'SERVICE_ROLE' == user.rol)
        next();

    let error = new Error("No autorizado");
    next(error);
}
