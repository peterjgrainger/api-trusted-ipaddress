const express = require('express');
const redisMiddleware = require('./middleware/redis');
const errorHandlerMiddleware = require('./middleware/error-handler');
const ipAddressValidation = require('./middleware/ip-address-validation');

const trustedIpAddressRoute = require('./routes/trusted-ipaddress');
const healthCheckRoute = require('./routes/health-check');

const app = express();

app.get(healthCheckRoute);
// Add the redis client to the request
app.use(redisMiddleware);
app.get(
  '/trusted/ipaddress/:ipAddress',
  ipAddressValidation,
  trustedIpAddressRoute
);
app.use(errorHandlerMiddleware);
module.exports = app;
