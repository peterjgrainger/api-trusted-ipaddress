const errorHandler = require('../../../src/middleware/error-handler');

describe('/src/middleware/error-handler', () => {
  let resMock;

  beforeEach(() => {
    resMock = jasmine.createSpyObj('res-mock', ['status', 'send']);
    resMock.status.and.returnValue(resMock);
  });

  it('sends 500 status code ', () => {
    const error = new Error();
    errorHandler(error, {}, resMock, () => {});

    expect(resMock.status).toHaveBeenCalledWith(500);
    expect(resMock.send).toHaveBeenCalledWith('Internal Server Error');
  });
});
