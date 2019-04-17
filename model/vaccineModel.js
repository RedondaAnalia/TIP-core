// vaccinetModel.js
const mongoose = require('mongoose');
// Setup schema
const vaccineSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: Number,
});
// Export Vaccine model
module.exports = mongoose.model('Vaccine', vaccineSchema);
