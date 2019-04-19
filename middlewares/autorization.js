

const config = require('../config/config');
const VALIDS_ROLES = config.VALIDS_ROLES
exports.onlyVeterinaries= function( req, res, next){
    const user = userRepository.findByEmail( req.body.email )
    if( VET_ROLE == user.rol)
        next();

    let error = new Error("No autorizado");
    next(error);
}
exports.onlyUsers= function( req, res, next){
    const user = userRepository.findByEmail( req.body.email )
    if( USER_ROLE == user.rol)
        next();

    let error = new Error("No autorizado");
    next(error);
}
exports.onlyServices= function( req, res, next){
    const user = userRepository.findByEmail( req.body.email )
    if( SERVICE_ROLE == user.rol)
        next();

    let error = new Error("No autorizado");
    next(error);
}
