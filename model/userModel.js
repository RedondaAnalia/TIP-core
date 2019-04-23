// usertModel.js
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let uniqueValidator= require('mongoose-unique-validator');
let roles = require('../config/config').VALIDS_ROLES;
let validRoles = {
    values : roles,
    message: '{VALUE} no es un rol permitido'
};
// Setup schema
var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: validRoles
    },
    gender: String,
    phone: String,
    pets: [{ type : Schema.Types.ObjectId, ref: 'Pet' }],
    experience: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 0
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
userSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico'});
// Export User model
module.exports = mongoose.model('User', userSchema);


