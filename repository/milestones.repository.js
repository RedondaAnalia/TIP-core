const Milestone = require('../model/milestoneModel');

exports.new = function (name, points) {
  return new Milestone({
    name: name,
    points: points,
  }).save();
};