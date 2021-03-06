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

exports.markAsApplied = function (req, res){
    applicationRepository.markAsApplied(req)
                        .then( response =>{
                            res.status(200).json({
                                ok:true,
                                milestones:response[1],
                                application:response[0] 
                            })
                        } )
}