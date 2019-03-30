// medicalCardtModel.js
var mongoose = require('mongoose');
// Setup schema
var medicalCardSchema = mongoose.Schema({
    title: String,
    diagnostic: String,
    veterinary: { type : ObjectId, ref: 'Veterinary' },
    code: Number,
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export MedicalCard model
var MedicalCard = module.exports = mongoose.model('medicalCard', medicalCardSchema);
module.exports.get = function (callback, limit) {
    MedicalCard.find(callback).limit(limit);
}

