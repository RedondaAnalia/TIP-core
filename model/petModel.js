// pettModel.js
var mongoose = require('mongoose');
var User = require('./userModel');
var genders = require('../config/config').PETS_GENDERS;

let validGenders = {
    values : genders,
    message: '{VALUE} no es un rol permitido'
};

// Setup schema
var petSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    castrate: { type: Boolean, default: false },
    applications: [{ type : mongoose.ObjectId, ref: 'Application' , default: []}],
    gender: { type: String, enum: validGenders },
    code: Number,
    milestones: [{ type : mongoose.ObjectId, ref: 'Milestone' , default: []}],
    medical_story: [{ type : mongoose.ObjectId, ref: 'MedicalCard' , default: []}],
    experience: {
        type: Number,
        default: 0
    },
    level:{
        type: Number,
        default: 0
    },
    image:{
        type: String
    },
    species: String,
    breed: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});
//method
petSchema.methods.findByType = function (callback) {
    User.find()
    return this.model('Book').find({ type: this.type }, callback);
};

  

// Export Pet model
module.exports = mongoose.model('Pet', petSchema);


