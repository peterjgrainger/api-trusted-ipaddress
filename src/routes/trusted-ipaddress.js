// JSON message to send if the IP address is not found in redis
const trustedMessage = {
  trusted: true
};

/**
 * JSON message to send if the IP address is found in redis
 * @param {string} source ip address source list
 */
function untrustedMessage(source) {
  return {
    trusted: false,
    source
  };
}

/**
 * Look in redis for the IP address passed in.
 */
function trustedIpAddressRoute(req, res) {
  req.redisClient.get(req.params.ipAddress, (error, source) => {
    const message = source ? untrustedMessage(source) : trustedMessage;
    res.json(message);
  });
}

module.exports = trustedIpAddressRoute;
