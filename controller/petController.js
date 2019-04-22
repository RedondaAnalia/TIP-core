// petController.js
// Import pet model
let petRepository = require('../repository/pet.repositoty');
let applicationReposity = require('../repository/application.repository') 
// Handle index actions
exports.index = function (req, res) {
    petRepository.findAll().exec( (err, pets) => {
        if (err) {
            res.status(500).json({
                ok: false,
                message: 'Error buscando mascotas',
                errors: err
            });
        }
        petRepository.getTotal().then(data =>
        res.status(200).json({
            ok: true,
            pets: pets,
            total: data
        }));
    });
};

// Handle view pet info
exports.findOne= function(req,res) {
    petRepository.findById(req.params.id).then(data => {
        if(data == null){
            return res.status(400).json({
                ok:false,
                message: ' La mascota con el id' + req.params.id + 'no existe',
                errors: { message: ' No existe una mascota con ese ID'}
            })
        }
        res.status(200).json({
            ok:true,
            pet : data
        }
        )}).catch(err => 
            res.status(400).json({
                ok: false,
                message : 'Error al buscar mascota',
                errors : err
            })
        );
    }

// Handle update pet info
exports.update = function (req, res) {
    petRepository.update(req.body).then(data => {
        if(data == null){
            return res.status(400).json({
                ok:false,
                message: ' La mascota con el id' + req.params.id + 'no existe',
                errors: { message: ' No existe una mascota con ese ID'}
            })
        }
        res.status(200).json({
            ok:true,
            pet : data
        }
        )}).catch(err => 
            res.status(400).json({
                ok: false,
                message : 'Error al buscar mascota',
                errors : err
            })
        );
};

// Handle delete pet
exports.delete = function (req, res) {
    petRepository.remove(req.params.pet_id).then(() => {
        res.status(200).json({
            ok:true,
            message: 'Pet deleted'
        });
    }).catch(err => 
            res.status(400).json({
                ok: false,
                message : 'Error al eliminar la mascota',
                errors : err
            })
    )
}


exports.medicalCard = function (req, res) {
    petRepository.findById(req.body.pet_id).then(pet => {
        if (!pet)
            return res.status(400).json({
            ok: false,
            message: ' La mascota con el id ' + req.body.pet_id + ' no existe',
            });
        medicalCardRepository.new(req.body).then((mc) =>{
            if(!mc)
                return res.status(500).json({
                    ok: false,
                    mensaje: 'la historia clinica no pudo ser creada',

                });
            petRepository.addMedicalCard(pet, mc).then((pet_with_mc) =>{
                if(!pet_with_mc)
                return res.status(500).json({
                    ok: false,
                    message: 'no se pudo agregar la historia clinica a la mascota con el id' + req.body.pet_id ,
                });
                return res.status(200).json({
                    ok:true,
                    pet: pet_with_mc,
                    message: 'Historia clinica agregada'
                });
            }).catch(err =>
                res.status(400).json({
                    ok: false,
                    message: 'error al agregar Historia clinica',
                    errors : err
                }
                )
            )

        })
    });
};

// Handle new application for pet
exports.application = function (req, res) {
    petRepository.findById(req.body.pet_id).then(data => {
        if (!data)
            return res.status(400).json({
            ok: false,
            message: ' La mascota con el id ' + req.body.pet_id + ' no existe',
            });
        applicationReposity.new(req.body).then((application) =>{
            if(!application)
                return res.status(500).json({
                    ok: false,
                    mensaje: 'la aplicación no pudo ser creada',

                });
            petRepository.addApplication(data, application).then((pet) =>{
                if(!pet)
                return res.status(500).json({
                    ok: false,
                    message: 'no se pudo agregar la aplicacion a la mascota con el id' + req.body.pet_id ,
                });
                return res.status(200).json({
                    ok:true,
                    pet: pet,
                    message: 'Aplicacion agregada'
                });
            }).catch(err =>
                res.status(400).json({
                    ok: false,
                    message: 'error al agregar Aplicacion',
                    errors : err
                }
                )
            )

        })
    });
};