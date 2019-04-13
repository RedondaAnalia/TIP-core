// medicalCardtModel.js
var mongoose = require('mongoose');
let Schema = mongoose.Schema;
// Setup schema
var applicationSchema = mongoose.Schema({
    
    vaccine: { type : Schema.Types.ObjectId, ref: 'Vaccine', required: true },
    code: Number,
    img: String,
    estimated_date: {
        type: Date,
        required: true
    },
    application_date: {
        type: Date,
        default: null
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export MedicalCard model
module.exports = mongoose.model('Application', applicationSchema);
