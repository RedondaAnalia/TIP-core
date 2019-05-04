let applicationRepository = require('../repository/application.repository') 


//ESTE UPDATE DEBERIA SER MAS PUNTUAL!
//EJ: MARCAR UNA APLICACION COMO REALIZADA.

exports.update = function (req, res) {
    applicationRepository.update(req)
                        .then(application => {
                                            res.status(200).json({
                                                ok : true,
                                                message: 'Application Info updated!',
                                                data: application
                                            });
                        }).catch(err =>{
                                        res.status(500).json({
                                            ok: false,
                                            message: 'Error updating applications!',
                                            err
                                        })
                        });
}



//NO DEBERIA ESTAR PUBLICADO!
//PRO: Returns all applications in DB
exports.index = function (req, res) {
    applicationRepository.findAll()
                        .then( applications => {
                                            res.status(200).json({
                                                ok: true,
                                                message: 'Applications found!',
                                                applications
                                            })
                        }).catch(err =>             
                                    res.status(500).json({
                                        ok: false,
                                        message: 'Error finding applications',
                                        err
                                    })
                        )
}