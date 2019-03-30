// veterinaryModel.js
var mongoose = require('mongoose');
// Setup schema
var veterinarySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: String,
    experience: Number,
    level: Number,
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Veterinary model
var Veterinary = module.exports = mongoose.model('veterinary', veterinarySchema);
module.exports.get = function (callback, limit) {
    Veterinary.find(callback).limit(limit);
}

