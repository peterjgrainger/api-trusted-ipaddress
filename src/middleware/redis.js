const redis = require('redis');

// reusable client
let client;
const clientConfiguration = {
  port: '6379',
  host: process.env.REDIS_HOST || 'localhost'
};

function redisMiddleware(req, res, next) {
  client = client || redis.createClient(clientConfiguration);
  req.redisClient = client;
  next();
}

module.exports = redisMiddleware;
