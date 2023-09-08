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

  it('Should delete a lion', function (done) {
    const lion = {
      name: 'Mufasa',
      age: 100,
      pride: 'Evil lions',
    };
    request(app)
      .post('/lions/')
      .send(lion)
      .set('Accept', 'application/json')
      .end((err, res) => {
        const lion = res.body;
        request(app)
          .delete(`/lions/${lion.id}`)
          .end((err, res) => {
            expect(res.body).to.eql(lion);
            done();
          });
      });
  });
  it('Should update a lion', function (done) {
    const lion = {
      name: 'Mufasa',
      age: 100,
      pride: 'Evil lions',
    };
    request(app)
      .post('/lions/')
      .send(lion)
      .set('Accept', 'application/json')
      .end((err, res) => {
        const lion = res.body;
        request(app)
          .put(`/lions/${lion.id}`)
          .send({
            name: 'TUKI',
          })
          .end((err, res) => {
            expect(res.body.name).to.eql('TUKI');
            done();
          });
      });
  });
});
