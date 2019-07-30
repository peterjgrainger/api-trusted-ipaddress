const trustedIpRoute = require('../../../src/routes/trusted-ipaddress');

describe('src/routes/trusted-ip', () => {
  let redisClient;
  let req;
  let res;

  beforeEach(() => {
    redisClient = jasmine.createSpyObj('client-mock', ['on', 'get']);
    req = {
      redisClient,
      params: {
        ipAddress: '1.1.1.1'
      }
    };
    res = jasmine.createSpyObj('res-mock', ['json', 'status', 'send']);
    res.status.and.returnValue(res);
  });

  it('Gets the ip address from redis', () => {
    trustedIpRoute(req, res);

    expect(redisClient.get.calls.allArgs()[0][0]).toBe('1.1.1.1');
  });

  it('sets the response to trusted if nothing is found', () => {
    trustedIpRoute(req, res);
    const callback = redisClient.get.calls.allArgs()[0][1];
    callback(undefined, undefined);

    expect(res.json).toHaveBeenCalledWith({
      trusted: true
    });
  });

  it('sets the response to not trusted if IP is found', () => {
    trustedIpRoute(req, res);
    const callback = redisClient.get.calls.allArgs()[0][1];
    callback(undefined, 'source of ip');

    expect(res.json).toHaveBeenCalledWith({
      trusted: false,
      source: 'source of ip'
    });
  });

  it("returns 500 if redis can't be accessed", () => {
    const next = jasmine.createSpy('next-mock');
    const error = new Error('The connection has already been closed.');

    trustedIpRoute(req, res, next);
    const callback = redisClient.get.calls.allArgs()[0][1];
    callback(error);

    expect(next).toHaveBeenCalledWith(error);
  });
});
