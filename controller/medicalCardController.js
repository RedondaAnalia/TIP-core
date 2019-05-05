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