const IP_ADDRESS_FORMAT = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
const ERROR_MESSAGE =
  'URI parameter IP Address is either missing or in an incorrect format';

function ipAddressValidation(req, res, next) {
  const { ipAddress } = req.params;
  const valid = ipAddress && IP_ADDRESS_FORMAT.test(ipAddress);

  if (valid) {
    next();
  } else {
    res.status(422).send(ERROR_MESSAGE);
  }
}

module.exports = ipAddressValidation;
