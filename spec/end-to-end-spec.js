const request = require('supertest');
const redis = require('redis');
const app = require('../src/app');

describe('/trusted/ipaddress/:ipAddress', () => {
  let redisAllDbClient;

  beforeAll(done => {
    redisAllDbClient = redis.createClient();

    redisAllDbClient.on('connect', error => done(error));
    redisAllDbClient.set('1.1.1.1', 'source of 1.1.1.1', error => done(error));
  });

  describe('Full List is requested', () => {
    describe('query params empty defaults to full list', () => {
      it('returns untrusted when IP address is in blacklist', done => {
        request(app)
          .get('/trusted/ipaddress/1.1.1.1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response => {
            expect(response.body.trusted).toBe(false);
            expect(response.body.source).toBe('source of 1.1.1.1');
            done();
          })
          .catch(done);
      });

      it('returns trusted when IP address is not in blacklist', done => {
        request(app)
          .get('/trusted/ipaddress/1.1.1.8')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response => {
            expect(response.body.trusted).toBe(true);
            done();
          })
          .catch(done);
      });
    });
  });
});
