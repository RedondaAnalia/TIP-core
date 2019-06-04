const { check } = require('express-validator/check');

exports.newUserJSONValidator = [
    // username must be exist
    check('name').not().isEmpty(),
    // username must be an email
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })
];

exports.newApplicationJSONValidator = [
    // pet_id must be exist
    check('pet_id').not().isEmpty(),
    // pet_id must be exist
    check('vaccine_id').not().isEmpty()
];
