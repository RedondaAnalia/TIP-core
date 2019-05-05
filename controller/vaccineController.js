const VaccineRepository = require('../repository/vaccine.repository');


// PRO: Returns all vaccines in DB
exports.index = function (req, res) {
  VaccineRepository.findAll()
                  .then (vaccines => {
                                  res.status(200).json({
                                    ok: true,
                                    message: 'Vaccines found!',
                                    vaccines,
                                  });
                  }).catch( err => {
                                  res.status(500).json({
                                    ok: false,
                                    message: 'Error finding vaccines!',
                                    err
                                  });
                  });
};


// PRO: Creates a new vaccine in DB
exports.new = function (req, res) {
  VaccineRepository.new(req.body)
                  .then( vaccine => { 
                            res.status(200).json({
                              ok: true,
                              message: 'Vaccine added!',
                              vaccine
                            })
                  }).catch( err => {
                            res.status(400).json({
                              ok: false,
                              message: 'Error adding vaccine!',
                              err    
                            });
                  });
};


// PROP: Returns the corresponding vaccine to the ID that arrives by parameter.
exports.view = function (req, res) {
  VaccineRepository.findById(req.params.vaccine_id)
                  .then(vaccine => {
                                  res.status(200).json({
                                    ok: true,
                                    message: 'Vaccine found!',
                                    data: vaccine
                                  })
                  }).catch(err => {
                                  res.status(500).json({
                                    ok: false,
                                    message:'Error finding vaccine'
                                  });
                  });
};








// VAN A HABER UPDATES MAS ESPECIFICOS!!!!
// Handle update vaccine info
exports.update = function (req, res) {
  VaccineRepository.update(req.body).then(data => {
    if (data == null) {
      return res.status(400).json({
        ok:false,
        message: ` La vacuna con el id${ req.body._id } no existe`,
        errors: { message: ' No existe una vacuna con ese ID'}
      });
    }
    res.status(200).json({
      ok:true,
      pet : data
    });
  }).catch(err => 
    res.status(400).json({
      ok: false,
      message : 'Error al buscar vacuna',
      errors : err
    })
  );
};