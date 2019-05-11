let petRepository = require('../repository/pet.repositoty');
let applicationReposity = require('../repository/application.repository') 


// PROP: Returns the corresponding pet to the ID that arrives by parameter.
exports.findOne= function(req,res) {
    petRepository.findById(req.params.id)
                .then(data => {
                            res.status(200).json({
                                ok:true,
                                message: 'Pet found!',
                                pet : data
                            })
                }).catch(err => 
                            res.status(400).json({
                                ok: false,
                                message : 'Error finding Pet!',
                                errors : err
                            })
                );
}


// PRO: Adds a Medical Card to a pet.
exports.addMedicalCard = function (req, res) {
    petRepository.addMedicalCard(req.body.pet_id,req.body.medicalCard)
                .then(pet => {
                            res.status(200).json({
                                ok:true,
                                msj:'Medical Card created and added successfully!',
                                pet
                            });
                }).catch(err => {
                            res.status(400).json({
                                ok:false,
                                message: 'Error while creating or added Medical Card',
                                err
                            })
                });    
};


// PRO: Adds an application to a pet.
exports.application = function (req, res) {
    petRepository.addApplication(req.body.pet_id, req.body)
                    .then(pet => {
                        res.status(200).json({
                            ok:true,
                            msj:'Application created and added successfully!',
                            pet
                        });
                    }).catch(err => {
                        res.status(400).json({
                            ok:false,
                            message: 'Error while creating or added Application',
                            err
                        })
                    });   
}


exports.image = function (req, res) {
    console.log(req.file)
    petRepository.updateImage(req.body.id,req.file.path).then(pet =>{
        res.json({
            message: 'Pet photo updated',
            data: pet
        });
    }).catch(err =>{
        res.status(400).json({
            ok: false,
            message : 'The image of the pet could not be updated',
            errors : err
        })
    })

};


// ESTE UPDATE VA A DESAPARECER POR UPDATES MAS ESPECIFICOS
// Handle update pet info
exports.update = function (req, res) {
    petRepository.update(req.body)
                .then(data => {
                            res.status(200).json({
                                ok:true,
                                message:'Pet updated!',
                                pet : data
                            })
                }).catch(err => 
                            res.status(400).json({
                                ok: false,
                                message : 'Error updating pet!',
                                errors : err
                            })
                );
    };