// userController.js
// Import contact model
User = require('../model/userModel');
// Handle index actions
exports.index = function (req, res) {
    User.get(function (err, user) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: user
        });
    });
};
// Handle create user actions
exports.new = function (req, res) {
    var user = new User();
    user.name = req.body.name ? req.body.name : user.name;
    user.gender = req.body.gender;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.experience = 0;
    user.level = 0;
// save the user and check for errors
    user.save(function (err) {
        // if (err)
        //     res.json(err);
res.json({
            message: 'New user created!',
            data: user
        });
    });
};
// Handle view user info
exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: contact
        });
    });
};
// Handle update user info
exports.update = function (req, res) {
User.findById(req.params.user_id, function (err, contact) {
        if (err)
            res.send(err);
user.name = req.body.name ? req.body.name : user.name;
        user.gender = req.body.gender;
        user.email = req.body.email;
        user.phone = req.body.phone;
// save the contact and check for errors
        user.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'User Info updated',
                data: contact
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    User.remove({
        _id: req.params.user_id
    }, function (err, user) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};