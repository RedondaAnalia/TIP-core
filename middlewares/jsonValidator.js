const { check } = require('express-validator/check');

exports.newUserJSONValidator = [
    check('name').not().isEmpty(),
    // username must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })
]