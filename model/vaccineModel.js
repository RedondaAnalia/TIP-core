// vaccinetModel.js
var mongoose = require('mongoose');
// Setup schema
var vaccineSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date_estimate_aplication: {
        type: Date,
        required: true
    },
    date_aplication: {
        type: Date,
        required: true
    },
    code: Number,
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Vaccine model
var Vaccine = module.exports = mongoose.model('vaccine', vaccineSchema);
module.exports.get = function (callback, limit) {
    Vaccine.find(callback).limit(limit);
}

