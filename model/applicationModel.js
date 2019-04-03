// medicalCardtModel.js
var mongoose = require('mongoose');
// Setup schema
var applicationSchema = mongoose.Schema({
    
    vaccine: { type : Schema.Types.ObjectId, ref: 'Vaccine' },
    code: Number,
    img: String,
    estimated_date: {
        type: Date,
    },
    application_date: {
        type: Date,
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export MedicalCard model
module.exports = mongoose.model('Application', applicationSchema);
