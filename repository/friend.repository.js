// friendController.js
// Import application model
const userRepository = require('./user.repository');
const friendshipService = require('../services/friendshipService');

const fn = userRepository.findByEmail();

// Handle create pet actions
exports.friends = function (email) {
  return  friendshipService.friends(email)
                .then(res => {
                  if (!res){
                   //ERROR RETORNO 
                  }
                   const relations = res.body.relation;
                  if(relations.isEmpty()){
                      return []
                  }
                  return Promise.all( relations.map(fn) )

                }).catch(err => err)
};
