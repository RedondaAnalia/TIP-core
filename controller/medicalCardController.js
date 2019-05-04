const MedicalCardRepository = require('../repository/medical-card.repository');


// Handle view vaccine info
exports.view = function (req, res) {
  MedicalCardRepository.findById(req.params.vaccine_id).then(mc => {
    res.json({
      message: 'Medical Card details loading..',
      data: mc
    }).catch(err => {
      res.send(err);
    });
  });
};


//PARA QUE LO NECESITARIAMOS???
// Handle index actions
exports.index = function (req, res) {
  MedicalCardRepository.findAll().exec((err, mc) => {
    if (err) {
      res.status(500).json({
        ok: false,
        message: 'Error buscando Historias Clinicas',
        errors: err
      });
    }
    MedicalCardRepository.countAll().exec((error,conteo) =>
      res.status(200).json({
        ok: true,
        mc,
        total: conteo
      }));
  });
};

// Handle create vaccine actions
exports.new = function (req, res) {
  MedicalCardRepository.new(req.body).then(data => 
    res.status(200).json({
      ok:true,
      medicalcard : data
    })).catch(err => 
    res.status(400).json({
      ok: false,
      errors : err
    })
  );
};


// Handle update vaccine info
exports.update = function (req, res) {
  MedicalCardRepository.update(req.body).then(data => {
    if (data == null) {
      return res.status(400).json({
        ok:false,
        message: ` La Historia clinica con el id${ req.body._id } no existe`,
        errors: { message: ' No existe una vacuna con ese ID'}
      });
    }
    res.status(200).json({
      ok:true,
      data : data
    });
  }).catch(err => 
    res.status(400).json({
      ok: false,
      message : 'Error al buscar vacuna',
      errors : err
    })
  );
};

// Handle delete vaccine
exports.delete = function (req, res) {
  MedicalCardRepository.remove(req.params.vaccine_id).then(() => {
    res.status(200).json({
      ok:true,
      message: 'Medical Card deleted'
    });
  }).catch(err => 
    res.status(400).json({
      ok: false,
      message : 'Error al eliminar la Historia clinica',
      errors : err
    })
  );
};