const rewire = require('rewire');

describe('src/middleware/redis', () => {
  let redisMock;
  let redisClient;
  let redisMiddleware;

  beforeEach(() => {
    redisMiddleware = rewire('../../../src/middleware/redis');
    redisClient = jasmine.createSpyObj('client-mock', ['on', 'get']);
    redisMock = jasmine.createSpyObj('redis-mock', ['createClient']);
    redisMock.createClient.and.returnValue(redisClient);
    // eslint-disable-next-line no-underscore-dangle
    redisMiddleware.__set__('redis', redisMock);
  });

  it('creates a client', done => {
    redisMiddleware({}, {}, done);

    expect(redisMock.createClient).toHaveBeenCalledWith({
      host: 'localhost',
      port: '6379'
    });
  });

  it('reuses client', done => {
    redisMiddleware({}, {}, () => {});
    redisMiddleware({}, {}, done);

    expect(redisMock.createClient).toHaveBeenCalledTimes(1);
  });

  it('attaches the client to the request', () => {
    const req = {};
    redisMiddleware(req, {}, () => {});

    expect(req.redisClient).toBe(redisClient);
  });
});
