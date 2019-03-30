// pettModel.js
var mongoose = require('mongoose');
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
    castrate: Boolean,
    vaccines: [{ type : mongoose.ObjectId, ref: 'Vaccine' , default: []}],
    gender: String,
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
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Pet model
var Pet = module.exports = mongoose.model('pet', petSchema);
module.exports.get = function (callback, limit) {
    Pet.find(callback).limit(limit);
}

