const { reset } = require('nodemon');
const app = require('./server');
const request = require('supertest');
const expect = require('chai').expect;
require('colors');

describe('- - - - [LIONS] - - - \n'.blue, function () {
  it('should get all lions', function (done) {
    request(app)
      .get('/lions')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, resp) {
        expect(resp.body).to.be.an('array');
        done();
      });
  });
  it('should get a specific lion', function (done) {
    request(app)
      .get('/lions/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('Should return the posted lion', function (done) {
    const lion = {
      name: 'Mufasa',
      age: 100,
      pride: 'Evil lions',
    };
    request(app)
      .post('/lions/')
      .send(lion)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        // expect(res.body).to.eql(lion);
        done();
      });
  });

  it.skip('Should update a lion', function (done) {
    const id = '90';
    request(app)
      .get(`/lions/${id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        request(app)
          .put(`/lions/${id}`)
          .send({
            name: 'chabon',
          })
          .end((err, res) => {
            if (res.body.id) {
              expect(res.body.data.name).to.eql('chabon');
            } else if (res.body.status) {
              expect(res.body.status).to.eql(404);
            }
            done();
          });
        // console.log(lion);
      });
  });

  it('Should delete a lion', function (done) {
    const id = '12';
    request(app)
      .get(`/lions/${id}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        request(app)
          .delete(`/lions/${id}`)
          .end((err, res) => {
            if (res.body.id) {
              expect(res.body.data.id).to.eql(id);
            } else if (res.body.status) {
              expect(res.body.status).to.eql(404);
            }
            done();
          });
        // console.log(lion);
      });
  });
});
