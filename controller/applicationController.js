// petController.js
// Import pet model
const applicationReposity = require('../repository/application.repository'); 

exports.index = function (req, res) {
  applicationReposity.findAll().then(applications => {
    applicationReposity.countAll().then(conteo => {
      res.status(200).json({
        ok: true,
        aplications: applications,
        total: conteo
      });
    });
  }).catch(err =>             
    res.status(500).json({
      ok: false,
      message: 'Error buscando aplicaciones',
      errors: err
    }));
};

exports.update = function (req, res) {
  applicationReposity.update(req).then((application) => {
    res.json({
      ok : true,
      message: 'Application Info updated',
      data: application
    });
  }).catch(err =>
    res.status(500).json({
      ok: false,
      message: 'Error al updatear aplicaciones',
      errors: err
    }
    )
  );
};