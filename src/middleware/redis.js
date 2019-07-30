const redis = require('redis');

// Reusable client
let client;

const clientConfiguration = {
  port: '6379',
  host: process.env.REDIS_HOST || 'localhost'
};

/**
 * Attach the redis client to the request to be used by the routes
 */
function redisMiddleware(req, res, next) {
  client = client || redis.createClient(clientConfiguration);
  req.redisClient = client;
  next();
}

module.exports = redisMiddleware;
