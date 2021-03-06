
const request = require('request');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const variables_env = require('../config/config-module.js').config()
const mongoose = require('mongoose');
let server = require('../index');

let should = chai.should();

chai.use(chaiHttp);

const url = variables_env.SERVERURL;

before('set up test-environment',function(){
  mongoose.connect(variables_env.MONGURI, function(){
    mongoose.connection.db.dropDatabase(function(){
    })    
  });
});

describe('TEST CONEXION API REST', () => {
  it('debe devolver mensaje de bienvenida', () => {
    chai.request(server , (error, response, body) => {
      expect(body).to.be.equal('{"ok":true,"message":"Welcome to PetHeroes API!"}');
    });
  });

  it('root debe responder estado 200', () => {
    chai.request(server, (error, response) => {
      expect(response.statusCode).to.be.equal(200);
    });
  });
});

/*
describe('Un usuario se da de alta', () => {


  
  it('deberia retornar esta 200', (done) => {

    const user =         
    {
      body:{
        name   : "pablo",
        email  : "saba@mail.com",
        password : "pablosaba123",
        phone  : 654321,
        gender : "Male"
      }
    }
    chai.request(server)
    .post('users')
    .send(user)
    .end( function(err,res){
      console.log('-------->' + res)
      res.should.have.status(200);
      res.body.message.should.have.equal("New user created!");
      res.should.be.a('object');
      res.body.data.name.should.have.equal('pablo');
      res.body.data.password.should.have.not.equal('pablosaba123');
      done();

  });
  });
  
  it('deberia retornar esta 412', (done) => {
    chai.request(server)
    .post('users')
    .send(
        {
            name   : "saba",
            email  : "saba@mail.com",
            password : "saba4432",
            phone  : 654321,
            gender : "Male"
          }
    ).end( function(err,res){
      res.should.have.status(412);
      done();

  });
  });

  it('no se logio y quiso cambiar su numero de telefono', (done) => {
    
    chai.request(server)
    .put('users')
    .send(
        {  
            email  : "saba@mail.com",
            phone  : 1111111,
            gender : "Male"
          }
    ).end( function(err,res){
      res.should.have.status(401);
      done();

  });
  });

  it('se logio ', (done) => {

    chai.request(url)
    .post('login')
    .send(
        {  
          email : "saba@mail.com",
          password : "pablosaba123"
          }
    ).end( function(err,res){
      res.should.have.status(200);
      done()
  });
})
})
*/