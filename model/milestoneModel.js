// milestoneModel.js
var mongoose = require('mongoose');
// Setup schema
var milestoneSchema = mongoose.Schema({
    name: String,
    experience: Number,
});
// Export Milestone model
var Milestone = module.exports = mongoose.model('milestone', milestoneSchema);
module.exports.get = function (callback, limit) {
    Milestone.find(callback).limit(limit);
}

