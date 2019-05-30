// levelModel.js
const mongoose = require('mongoose');
// Setup schema
const levelSchema = mongoose.Schema({
    level: {
        type: Number,
        required: true
    },
    min_exp: {
        type: Number,
        required: true
    },
    max_exp: {
        type: Number,
        required: true
    }

});
// Export Vaccine model
module.exports = mongoose.model('Level', levelSchema);
