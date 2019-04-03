// petController.js
// Import pet model
Pet = require('../model/petModel');
// Handle index actions
exports.index = function (req, res) {
    Pet.get(function (err, pet) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Pets retrieved successfully",
            data: pet
        });
    });
};
// Handle create pet actions
exports.new = function (newPet) {
    console.log(newPet);
    var pet = new Pet({
        name : newPet.name ? newPet.name : pet.name,
        gender : newPet.gender,
        date_of_birth : newPet.date_of_birth,
        castrate : newPet.castrate,
        vaccines : [],
        code : newPet.code,
        milestones : [],
        medical_story : [],
    });

// save the pet and check for errors
    return new Promise ((resolve,reject) => {
        pet.save(function (err, pet) {
            if (err)
                return reject(err)
            return resolve(pet);
        });
    });
};
// Handle view pet info
exports.view = function (req, res) {
    Pet.findById(req.params.pet_id, function (err, pet) {
        if (err)
            res.send(err);
        res.json({
            message: 'Pet details loading..',
            data: pet
        });
    });
};
// Handle update pet info
exports.update = function (req, res) {
Pet.findById(req.params.pet_id, function (err, pet) {
        if (err)
            res.send(err);
        pet.name = req.body.name ? req.body.name : pet.name;
        pet.gender = req.body.gender;
        pet.date_of_birth = req.body.date_of_birth;
        pet.castrate = req.body.castrate;
        pet.code = req.body.code;
        pet.experience = req.body.experience;
        pet.level = req.body.level;
        
// save the pet and check for errors
        pet.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Pet Info updated',
                data: pet
            });
        });
    });
};
// Handle delete pet
exports.delete = function (req, res) {
    Pet.remove({
        _id: req.params.pet_id
    }, function (err, pet) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Pet deleted'
        });
    });
};
// Handle new application for pet
exports.newApplication = function (req, res) {
    Pet.findById(req.params.pet_id, function (err, pet) {
        if (err)
            return res.status(500).json({
                ok: false,
                message: 'no se pudo agregar la aplicacion',
                errors: err
            });
        if (!pet)
            return res.status(500).json({
            ok: false,
            message: 'la mascota no existe',
            errors: err
        });
            applicationController.new(req.body.pet).then((aplication) =>{
                pet.aplications.push(aplication)
                pet.save( (err, pet) =>{
                    if(err)
                        return res.status(400).json({
                            ok:false,
                            message: 'error al agregar Aplicacion',
                            errors: err
                        })
                    return res.status(200).json({
                        ok:true,
                        user: pet
                    })
                });
                
            });
    });
};