var request = require('supertest');
var app = require('../index.js');
var chai = require('chai');
var expect=chai.expect;
var projectId;

describe('GET /projects', function () {
    it('Get list of projects', function (done) {
        request(app).get('/api/projects').end(function(err, res) { 
            expect(res.statusCode).to.equal(200); 
            expect(res.body).to.be.an('array'); 
            done(); 
          }); 
    });
});

describe('POST /project', function () {
    it('Create new project', function (done) {
        request(app).post('/api/project')
            .send({
                project: 'Sample Project',
                manager: '5c7a91dc94cc730d68b4b21f'
            })
            .set('Accept', 'application/json')
            .expect(201, function (err, res) {
                projectId = res.body._id;
                done();
            });
    });
});

describe('POST /project without providing required fields', function () {
    it('Not create new project', function (done) {
        request(app).post('/api/project')
            .send({
                project: 'Test Project'
            })
            .set('Accept', 'application/json')
            .expect(500, done);
    });
});

describe('GET /project/:id', function () {
    it('Get existing project', function (done) {
        request(app).get('/api/project/' + projectId)
            .expect(200, done);
    });
});

describe('GET illegal /project/:id', function () {
    it('Get project with illegal id', function (done) {
        request(app).get('/api/project/' + 'sdasdsada sdwaqr3w 3r3')
            .expect(500, done);
    });
});

describe('PUT /project/:id', function () {
    it('Modify existing project', function (done) {
        request(app).put('/api/project/' + projectId)
            .send({
                project: 'Sample Project'
            })
            .set('Accept', 'application/json')
            .expect(200, done);
    });
});

describe('PUT illegal /project/:id', function () {
    it('Modify existing project with illegal object', function (done) {
        request(app).put('/api/project/' + projectId)
            .send({
                project: { b: 7 },
            })
            .set('Accept', 'application/json')
            .expect(500, done);
    });
});

describe('DELETE /project/:id', function () {
    it('Delete existing project', function (done) {
        request(app).delete('/api/project/' + projectId)
            .expect(200, done);
    });
});

describe('GET /project-tasks', function () {
    it('Get list of project tasks', function (done) {
        request(app).get('/api/project-tasks').end(function(err, res) { 
            expect(res.statusCode).to.equal(200); 
            expect(res.body).to.be.an('array'); 
            done(); 
          }); 
    });
});