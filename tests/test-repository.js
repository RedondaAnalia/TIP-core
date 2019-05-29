
const chai = require('chai');
const chaiHttp = require('chai-http');
const variables_env = require('../config/config-module.js').config();

const mongoose = require('mongoose');
const server =require('../index');
const should = chai.should();

chai.use(chaiHttp);

before('set up test-environment',function(){
  mongoose.connect(variables_env.MONGURI, function(){
    mongoose.connection.db.dropDatabase(function(){
    })    
  });
});


describe('/POST user', () => {
    it('it should CREATE a new user', (done) => {
        let json = {
            name:"newUser",
            email:"newUser@mail.com",
            password : "newUser",
            phone: 3324123,
            gender : "MALE"
        };
        chai.request(server)
            .post('/users')
            .send(json)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('New user created!')
                res.body.data.should.have.property('name');
                res.body.data.should.have.property('name').eql('newUser');
                res.body.data.should.have.property('email').eql('newUser@mail.com');
                res.body.data.should.have.property('phone').eql("3324123");
                res.body.data.should.have.property('gender').eql('MALE');
                res.body.data.should.have.property('role').eql('USER_ROLE');
                res.body.data.should.have.property('pets').be.a('Array');
                res.body.data.should.have.property('level').eql(0);
                res.body.data.should.have.property('experience').eql(0);
                res.body.data.should.have.not.property('password');
                done();
            });
    });
    describe('/GET user', () => {
        it('it should GET user created', (done) => {
            chai.request(server)
                .get('/users/newUser@mail.com')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User found!')
                    res.body.data.should.have.property('name');
                    res.body.data.should.have.property('name').eql('newUser');
                    res.body.data.should.have.property('email').eql('newUser@mail.com');
                    res.body.data.should.have.property('phone').eql("3324123");
                    res.body.data.should.have.property('gender').eql('MALE');
                    res.body.data.should.have.property('role').eql('USER_ROLE');
                    res.body.data.should.have.property('pets').be.a('Array');
                    res.body.data.should.have.property('level').eql(0);
                    res.body.data.should.have.property('experience').eql(0);
                    res.body.data.should.have.not.property('password');

                    describe('/POST pet', () => {
                        it('it should POST a pet to user' + res.body.name, (done) => {

                            let json = {
                                user_id: res.body.data.user_id,
                                pet: {
                                    name: "Arepa",
                                    date_of_birth: "2014/10/20",
                                    castrate: true,
                                    gender: "FEMALE"

                                }
                            };
                            chai.request(server)
                                .post('/users/pet')
                                .send(json)
                                .end((err, res) => {
                                    res.should.have.status(200);
                                    done()
                                });
                        });
                    });
                    done();
                });
        });
    });
});

after(() => {
    server.close()
    mongoose.connection.close()

});
