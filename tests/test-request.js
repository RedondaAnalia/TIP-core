const request = require('request');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const should = require('should')

const sampleUser = {
    username: username,
    password: password
}


chai.use(chaiHttp);
const url= 'http://localhost:3000';

before('set up test-environment',function(){
  //connect to test-database
  //create collections
  //done();
  })
  
  beforeEach('drop and create test data',function(){
  //wipe out all data in collections
  //create test-data entries in collections
  })


describe('Model User', function () {
    it('add user', function (done) {
        should(sampleUser).have.property('username', username);
        User.saveUser(sampleUser, (error, user) => {
            should.not.exist(error);
            should.exist(user);
            should(user).have.property('username', username);
            should(user).have.property('password', password);
            done()
        });
    });
    /*
    define more testcases
    */
})


describe('TEST CONEXION API REST', () => {
  it('Get http://localhost:3000 debe devolver mensaje de bienvenida', (done) => {
    request(url , (error, response, body) => {
      expect(body).to.be.equal('{"ok":true,"message":"Welcome to PetHeroes API!"}');
      done();
    });
  });

  it('Get http://localhost:3000 debe responder estado 200', (done) => {
    request(url, (error, response) => {
      expect(response.statusCode).to.be.equal(200);
      done();
    });
  });
});

/*
describe('USER MODE CONECTION', () => {

    it('create a user and get him', (done) => {
        chai.request(url)
            .post('/users')
            .send(
                {
                    name   : "pablo",
                    email  : "saba@mail.com",
                    phone  : 654321,
                    gender : "Male"
                  }
            )
            .end( function(err,res){
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });

});
*/