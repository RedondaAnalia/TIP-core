var request = require('request');
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000';


describe('TEST CONEXION API REST', function () {
    it('Get http://localhost:3000 debe devolver mensaje de bienvenida', function(done) {
        request(url , function(error, response, body) {
            expect(body).to.be.equal('{"ok":true,"message":"Welcome to PetHeroes API!"}');
            done();
        });
    });

    it('Get http://localhost:3000 debe responder estado 200', function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.be.equal(200);
            done();
        });
    });
})

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