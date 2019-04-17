// vaccineController.js
// Import vaccine model
const VaccineRepository = require('../repository/vaccine.repository');

// Handle index actions
exports.index = function (req, res) {
  VaccineRepository.findAll().exec((err, vaccines) => {
    if (err) {
      res.status(500).json({
        ok: false,
        message: 'Error buscando vacunas',
        errors: err
      });
    }
    VaccineRepository.countAll().exec((error,conteo) =>
      res.status(200).json({
        ok: true,
        vaccines,
        total: conteo
      }));
  });
};

// Handle create vaccine actions
exports.new = function (req, res) {
  VaccineRepository.new(req.body).then(data => 
    res.status(200).json({
      ok:true,
      vaccine : data
    })).catch(err => 
    res.status(400).json({
      ok: false,
      errors : err
    })
  );
};

// Handle view vaccine info
exports.view = function (req, res) {
  VaccineRepository.findById(req.params.vaccine_id).then(vaccine => {
    res.json({
      message: 'Vaccine details loading..',
      data: vaccine
    }).catch(err => {
      res.send(err);
    });
  });
};

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

// Handle delete vaccine
exports.delete = function (req, res) {
  VaccineRepository.remove(req.params.vaccine_id).then(() => {
    res.status(200).json({
      ok:true,
      message: 'Vaccine deleted'
    });
  }).catch(err => 
    res.status(400).json({
      ok: false,
      message : 'Error al eliminar la vacuna',
      errors : err
    })
  );
};