var request = require('supertest');
var app = require('../index.js');
var chai = require('chai');
var expect=chai.expect;
var userId;

describe('GET /users', function () {
    it('Get list of users', function (done) {
        request(app).get('/api/users').end(function(err, res) { 
            expect(res.statusCode).to.equal(200); 
            expect(res.body).to.be.an('array'); 
            done(); 
          }); 
    });
});

describe('POST /user', function () {
    it('Create new user', function (done) {
        request(app).post('/api/user')
            .send({
                firstName: 'First Name',
                lastName: 'Last Name',
                employeeId: 'E123',
            })
            .set('Accept', 'application/json')
            .expect(201, function (err, res) {
                userId = res.body._id;
                done();
            });
    });
});

describe('POST /user without providing required fields', function () {
    it('Not create new user', function (done) {
        request(app).post('/api/user')
            .send({
                firstName: 'Test First Name'
            })
            .set('Accept', 'application/json')
            .expect(500, done);
    });
});

describe('GET /user/:id', function () {
    it('Get existing user', function (done) {
        request(app).get('/api/user/' + userId)
            .expect(200, done);
    });
});

describe('GET illegal /user/:id', function () {
    it('Get user with illegal id', function (done) {
        request(app).get('/api/user/' + 'sdasdsada sdwaqr3w 3r3')
            .expect(500, done);
    });
});

describe('PUT /user/:id', function () {
    it('Modify existing user', function (done) {
        request(app).put('/api/user/' + userId)
            .send({
                firstName: 'Sample First Name1',
                lastName: 'Sample Last Name1',
                employeeId: '11212112121',
            })
            .set('Accept', 'application/json')
            .expect(200, done);
    });
});

describe('PUT illegal /user/:id', function () {
    it('Modify existing user with illegal object', function (done) {
        request(app).put('/api/user/' + userId)
            .send({
                firstName: { a: 3 },
            })
            .set('Accept', 'application/json')
            .expect(500, done);
    });
});

describe('DELETE /user/:id', function () {
    it('Delete existing user', function (done) {
        request(app).delete('/api/user/' + userId)
            .expect(200, done);
    });
});

describe('DELETE illegal /user/:id', function () {
    it('Delete user with illegal id', function (done) {
        request(app).delete('/api/user/' + 'sdasdsada sdwaqr3w 3r3')
            .expect(500, done);
    });
});
