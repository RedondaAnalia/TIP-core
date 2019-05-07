// milestoneModel.js
var mongoose = require('mongoose');
// Setup schema
var milestoneSchema = mongoose.Schema({
    name: String,
    points: Number,
});
// Export Milestone model
module.exports = mongoose.model('Milestone', milestoneSchema);


