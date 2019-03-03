var request = require('supertest');
var app = require('../index.js');
var chai = require('chai');
var expect=chai.expect;
var taskId;

describe('GET /tasks', function () {
    it('Get list of tasks', function (done) {
        request(app).get('/api/tasks').end(function(err, res) { 
            expect(res.statusCode).to.equal(200); 
            expect(res.body).to.be.an('array'); 
            done(); 
          }); 
    });
});

describe('POST /task', function () {
    it('Create new task', function (done) {
        request(app).post('/api/task')
            .send({
                task: 'Sample Task',
                projectId: '5c7b7bd3d722bc1b0462328b',
                userId: '5c7a91dc94cc730d68b4b21f'
            })
            .set('Accept', 'application/json')
            .expect(201, function (err, res) {
                taskId = res.body._id;
                done();
            });
    });
});

describe('POST /task without providing required fields', function () {
    it('Not create new task', function (done) {
        request(app).post('/api/task')
            .send({
                task: 'Test Task'
            })
            .set('Accept', 'application/json')
            .expect(500, done);
    });
});

describe('GET /task/:id', function () {
    it('Get existing task', function (done) {
        request(app).get('/api/task/' + taskId)
            .expect(200, done);
    });
});

describe('GET illegal /task/:id', function () {
    it('Get task with illegal id', function (done) {
        request(app).get('/api/task/' + 'sdasdsada sdwaqr3w 3r3')
            .expect(500, done);
    });
});

describe('PUT /task/:id', function () {
    it('Modify existing task', function (done) {
        request(app).put('/api/task/' + taskId)
            .send({
                task: 'Sample Task 1'
            })
            .set('Accept', 'application/json')
            .expect(200, done);
    });
});

describe('PUT illegal /task/:id', function () {
    it('Modify existing task with illegal object', function (done) {
        request(app).put('/api/task/' + taskId)
            .send({
                task: { b: 7 }
            })
            .set('Accept', 'application/json')
            .expect(500, done);
    });
});

describe('DELETE /task/:id', function () {
    it('Delete existing task', function (done) {
        request(app).delete('/api/task/' + taskId)
            .expect(200, done);
    });
});

describe('DELETE illegal /task/:id', function () {
    it('Delete task with illegal id', function (done) {
        request(app).delete('/api/task/' + 'sdasdsada sdwaqr3w 3r3')
            .expect(500, done);
    });
});

describe('GET /task-by-project', function () {
    it('Get list of task by project', function (done) {
        request(app).get('/api/task-by-project/5c7b7bd3d722bc1b0462328b').end(function(err, res) { 
            expect(res.statusCode).to.equal(200); 
            expect(res.body).to.be.an('array'); 
            done(); 
          }); 
    });
});