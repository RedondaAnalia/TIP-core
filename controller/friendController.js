const friendshipService = require('../services/friendshipService');
const friendRepository = require('../repository/friend.repository');
// PROP: Returns the corresponding pet to the ID that arrives by parameter.
exports.relationship= function(req,res) {
    friendshipService.createRelationship
                .then(data => {
                            res.status(200).json({
                                ok:true,
                                message: 'new RelationShip!',
                                pet : data
                            })
                }).catch(err => 
                            res.status(400).json({
                                ok: false,
                                message : 'cannot create relationship!',
                                errors : err
                            })
                );
};

exports.friends= function(req,res) {
    friendRepository.friends(req.params.mail)
        .then(data => {
            res.status(200).json({
                ok:true,
                message: 'found friends!',
                friends : data
            })
        }).catch(err =>
        res.status(400).json({
            ok: false,
            message : 'Error finding friends!',
            errors : err
        })
    );
};

