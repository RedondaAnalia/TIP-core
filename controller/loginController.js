var bcrypt= require('bcryptjs');
var jwt= require('jsonwebtoken');

var SEED= require('../config/config').SEED;
const userRepository = require('../repository/user.repository')


// PRO: Login an user and provides a token.
exports.sign = (req, res) => {
    const body= req.body;
    userRepository.findByEmail(body.email)
                .then(usuarioDB => {
                                if(!usuarioDB){
                                    return  res.status(400).json({
                                        ok: false,
                                        mensaje: 'Credenciales incorrectas - email',
                                    });
                                }
                                if( !bcrypt.compareSync( body.password, usuarioDB.password ) ){
                                    return  res.status(401).json({
                                        ok: false,
                                        mensaje: 'Credenciales incorrectas - password',
                                    });
                                }

                                //Crear un Token!
                                var token= jwt.sign({ user: usuarioDB }, SEED , { expiresIn: 14400 } ); //4 horas

                                return res.status(200).json({
                                                        ok: true,
                                                        usuario: usuarioDB,
                                                        token: token,
                                       });
                }).catch(err => {
                            return res.status(500).json({
                                                        ok: false,
                                                        message: 'Login error!',
                                                        err
                                    });
                });
};