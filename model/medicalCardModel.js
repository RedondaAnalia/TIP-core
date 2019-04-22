// medicalCardtModel.js
var mongoose = require('mongoose');
// Setup schema
var medicalCardSchema = mongoose.Schema({
    title: String,
    diagnostic: String,
    veterinary: { 
        type : ObjectId, 
        ref: 'Veterinary', 
        required: true
    },
    number: Number,
    create_date: {
        type: Date,
        default: Date.now
    }

});
// Export MedicalCard model
module.exports = mongoose.model('MedicalCard', medicalCardSchema);


