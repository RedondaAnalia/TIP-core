const request = require('request');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const variables_env = require('../config/config-module.js').config()
const mongoose = require('mongoose');
let should = chai.should();
const userRepository = require('../repository/user.repository')

chai.use(chaiHttp);

before('set up test-environment',function(){
  mongoose.connect(variables_env.MONGOURI, function(){
    mongoose.connection.db.dropDatabase(function(){
    })    
  });
});


describe('user', () => {
    describe('se crea', () => {

        describe('cargo todos sus datos',()=>{
            it('deberia encontrarlo cuando busco todos ', (done) => {
                userRepository.new(new User({
                    name: "pablo",
                    email: "saba@mail.com",
                    password: "12C",
                    phone : 1533266945,
                    gender : "Male",
                    rol : "USER_ROLE"
                }), (err, user) => {
                    
                })
                    

                })              
                  

            });
            });
    });
});