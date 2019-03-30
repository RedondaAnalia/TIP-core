// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});
// Import user controller
var userController = require('./controller/userController');
// User routes
router.route('/users')
    .get(userController.index)
    .post(userController.new);
router.route('/users/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);
// Import veterinary controller
var veterinaryController = require('./controller/veterinaryController');
// Veterinary routes
router.route('/veterinaries')
    .get(veterinaryController.index)
    .post(veterinaryController.new);
router.route('/veterinaries/:veterinaries_id')
    .get(veterinaryController.view)
    .patch(veterinaryController.update)
    .put(veterinaryController.update)
    .delete(veterinaryController.delete);

// Export API routes
module.exports = router;