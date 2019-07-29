const express = require('express');
const redisMiddleware = require('./middleware/redis');
const trustedIpAddressRoute = require('./routes/trusted-ipaddress');

const app = express();

app.use(redisMiddleware);
app.get('/trusted/ipaddress/:ipAddress', trustedIpAddressRoute);
module.exports = app;
