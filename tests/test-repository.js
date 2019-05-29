
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
                res.body.should.have.property('message').eql('New user created!');
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
                describe('/POST repeat user', () => {
                    it('it should THROW an error', (done) => {
                        let json = {
                            name: "newUser",
                            email: "newUser@mail.com",
                            password: "newUser",
                            phone: 3324123,
                            gender: "MALE"
                        };
                        chai.request(server)
                            .post('/users')
                            .send(json)
                            .end((err, res) => {
                                res.should.have.status(412);
                                res.body.should.be.a('object');
                                res.body.should.have.property('message').eql('Error creating new user!');
                                res.body.err.should.have.property('message').eql('User validation failed: email: email debe ser unico');
                                done();
                            });
                    });
                });

                done();
            });
    });

    describe('/POST a user with no configure mail', () => {
        it('it should THROW an error', (done) => {
            let json = {
                name: "newUser",
                email: "newUser",
                password: "newUser",
                phone: 3324123,
                gender: "MALE"
            };
            chai.request(server)
                .post('/users')
                .send(json)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors').be.a('Array');
                    res.body.should.have.property('errors').that.is.not.empty;
                    res.body.should.have.nested.property('errors[0].param').eql('email');
                    res.body.should.have.nested.property('errors[0].value').eql('newUser');
                    res.body.should.have.nested.property('errors[0].msg').eql('Invalid value');

                    done();
                });
        });
    });
    describe('/GET user', () => {
        it('it should GET user created', (done) => {
            chai.request(server)
                .get('/users/newUser@mail.com')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User found!');
                    res.body.data.should.have.property('name');
                    res.body.data.should.have.property('name').eql('newUser');
                    res.body.data.should.have.property('email').eql('newUser@mail.com');
                    res.body.data.should.have.property('phone').eql("3324123");
                    res.body.data.should.have.property('gender').eql('MALE');
                    res.body.data.should.have.property('role').eql('USER_ROLE');
                    res.body.data.should.have.property('pets').be.a('Array');
                    res.body.data.should.have.property('level').eql(0);
                    res.body.data.should.have.property('experience').eql(0);
                    res.body.data.should.have.property('pets').that.is.empty;
                    res.body.data.should.have.not.property('password');

                    describe('/POST pet', () => {
                        it('it should POST a pet to user' + res.body.name, (done) => {

                            let json = {
                                user_id: res.body.data._id,
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
                                    res.body.should.be.a('object');
                                    res.body.should.have.property('message').eql("pet added to "+ res.body.user.mail);
                                    res.body.user.should.have.property('name');
                                    res.body.user.should.have.property('name').eql('newUser');
                                    res.body.user.should.have.property('email').eql('newUser@mail.com');
                                    res.body.user.should.have.property('phone').eql("3324123");
                                    res.body.user.should.have.property('gender').eql('MALE');
                                    res.body.user.should.have.property('role').eql('USER_ROLE');
                                    res.body.user.should.have.property('pets').be.a('Array');
                                    res.body.user.should.have.property('level').eql(0);
                                    res.body.user.should.have.property('experience').eql(0);
                                    res.body.user.should.have.not.property('password');
                                    res.body.user.should.have.property('pets').lengthOf(1);

                                    done()
                                });
                        });
                    });

                    describe('/POST pet', () => {
                        it('it should POST a pet to user' + res.body.name, (done) => {

                            let json = {
                                user_id: res.body.data._id,
                                pet: {
                                    name: "Arepa",
                                    date_of_birth: "2014/10/20",
                                    castrate: true,
                                    gender: "CANARIO"

                                }
                            };
                            chai.request(server)
                                .post('/users/pet')
                                .send(json)
                                .end((err, res) => {
                                    res.should.have.status(400);
                                    res.body.error.should.have.property('message').eql('Pet validation failed: gender: CANARIO no es un rol permitido');
                                });
                            done()
                        });
                    });

                    done();
                });
        });
    });
});

