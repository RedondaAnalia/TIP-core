const friendshipService = require('../services/friendshipService');

exports.relationship = function(req,res) {
    friendshipService.createRelationship(req.body.aMail,req.body.bMail)
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