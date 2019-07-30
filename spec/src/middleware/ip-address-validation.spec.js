const ipAddressValidation = require('../../../src/middleware/ip-address-validation');

describe('src/middleware/ip-address-validation', () => {
  let reqMock;
  let nextMock;
  let resMock;

  beforeEach(() => {
    reqMock = {
      params: {
        ipAddress: '1.1.1.1'
      }
    };
    nextMock = jasmine.createSpy('next-mock');
    resMock = jasmine.createSpyObj('res-mock', ['status', 'send']);
    resMock.status.and.returnValue(resMock);
  });

  it('validates correct IP address', () => {
    ipAddressValidation(reqMock, {}, nextMock);

    expect(nextMock).toHaveBeenCalledWith();
  });

  describe('fails validation if ip address is in the wrong format', () => {
    it('sets status to 422', () => {
      reqMock.params.ipAddress = 'wrongFormat';
      ipAddressValidation(reqMock, resMock, nextMock);

      expect(resMock.status).toHaveBeenCalledWith(422);
    });

    it('returns error message to user', () => {
      reqMock.params.ipAddress = 'wrongFormat';
      ipAddressValidation(reqMock, resMock, nextMock);

      expect(resMock.send).toHaveBeenCalledWith(
        'URI parameter IP Address is either missing or in an incorrect format'
      );
    });
  });
});
