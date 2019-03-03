var request = require('supertest');
var app = require('../index.js');
var chai = require('chai');
var expect=chai.expect;
var parentId;

describe('GET /parents', function () {
    it('Get list of parents', function (done) {
        request(app).get('/api/parents').end(function(err, res) { 
            expect(res.statusCode).to.equal(200); 
            expect(res.body).to.be.an('array'); 
            done(); 
          }); 
    });
});

describe('POST /parent', function () {
    it('Create new parent', function (done) {
        request(app).post('/api/parent')
            .send({
                parent:'Parent Task 1',
                projectId: '5c7b7bd3d722bc1b0462328b'
            })
            .set('Accept', 'application/json')
            .expect(201, function (err, res) {
                parentId = res.body._id;
                done();
            });
    });
});

describe('POST /parent without providing required fields', function () {
    it('Not create new parent', function (done) {
        request(app).post('/api/parent')
            .send({
                parent: 'Test Parent Task'
            })
            .set('Accept', 'application/json')
            .expect(500, done);
    });
});

describe('GET /parent/:id', function () {
    it('Get existing parent', function (done) {
        request(app).get('/api/parent/' + parentId)
            .expect(200, done);
    });
});

describe('GET illegal /parent/:id', function () {
    it('Get parent with illegal id', function (done) {
        request(app).get('/api/parent/' + 'sdasdsada sdwaqr3w 3r3')
            .expect(500, done);
    });
});

describe('PUT /parent/:id', function () {
    it('Modify existing parent', function (done) {
        request(app).put('/api/parent/' + parentId)
            .send({
                parent: 'Sample Parent 1'
            })
            .set('Accept', 'application/json')
            .expect(200, done);
    });
});

describe('PUT illegal /parent/:id', function () {
    it('Modify existing parent with illegal object', function (done) {
        request(app).put('/api/parent/' + parentId)
            .send({
                parent: { b: 7 },
            })
            .set('Accept', 'application/json')
            .expect(500, done);
    });
});

describe('DELETE /parent/:id', function () {
    it('Delete existing parent', function (done) {
        request(app).delete('/api/parent/' + parentId)
            .expect(200, done);
    });
});

describe('DELETE illegal /parent/:id', function () {
    it('Delete parent with illegal id', function (done) {
        request(app).delete('/api/parent/' + 'sdasdsada sdwaqr3w 3r3')
            .expect(500, done);
    });
});

describe('GET /parent-of-project', function () {
    it('Get list of parents of project', function (done) {
        request(app).get('/api/parent-of-project/5c7b7bd3d722bc1b0462328b').end(function(err, res) { 
            expect(res.statusCode).to.equal(200); 
            expect(res.body).to.be.an('array'); 
            done(); 
          }); 
    });
});