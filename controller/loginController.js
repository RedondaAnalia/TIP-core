var bcrypt= require('bcryptjs');
var jwt= require('jsonwebtoken');

var SEED= require('../config/config').SEED;

const userRepository = require('../repository/user.repository')

// Google
var CLIENT_ID = require('../config/config').CLIENT_ID;
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

//========================================
// Autenticacion google
//========================================

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    const payload = ticket.getPayload();
    // const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true,

    }
  }

exports.singWithGoogle = async (req, res) => {
    
    var token = req.body.token;

    var googleUser= await verify( token )
                                .catch (e=>{
                                    return  res.status(403).json({
                                        ok: false,
                                        mensaje: 'Token no valido'
                                    });  
                                });

    userRepository.findByEmail(googleUser.email).exec( (err,usuarioDB)=> {

        if(err){
            return  res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Usuario',
                errors: err
            });
        }
       
        if(usuarioDB){
            if ( !usuarioDB.google ) {
                return  res.status(400).json({
                    ok: false,
                    mensaje: 'Debe usar su autenticacion normal'
                });
            } else {
                var token= jwt.sign({ user: usuarioDB }, SEED , { expiresIn: 14400 } ); //4 horas
                
                res.status(200).json({
                    ok: true,
                    usuario: usuarioDB,
                    token: token,
                    id: usuarioDB._id
                });
            }
        } else {
            userRepository.newGoogleUser(googleUser).then((user) =>{
                var token= jwt.sign({ user: user }, SEED , { expiresIn: 14400 } ); //4 horas
                user.password = ' :) '
                res.status(200).json({
                    ok: true,
                    usuario: user,
                    token: token,
                    id: usuarioDB._id
                });
            })
        }
    })
};


//========================================
// Autenticacion normal
//========================================

exports.sing = (req, res) => {

    var body= req.body;
    userRepository.findByEmail(body.email).exec((err , usuarioDB) => {

        if(err){
            return  res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar Usuarios',
                errors: err
            });
        }

        if(!usuarioDB){
            return  res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                errors: err
            });
        }

        if( !bcrypt.compareSync( body.password, usuarioDB.password ) ){
            return  res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            });
        }

        usuarioDB.password= ':)'

        //Crear un Token!
        var token= jwt.sign({ user: usuarioDB }, SEED , { expiresIn: 14400 } ); //4 horas

        return res.status(200).json({
            ok: true,
           usuario: usuarioDB,
           token: token,
           id: usuarioDB._id
        });
    })
    /*.catch(err => {

    });*/



    
};