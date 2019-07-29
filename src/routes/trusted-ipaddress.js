const trustedMessage = {
  trusted: true
};

function untrustedMessage(source) {
  return {
    trusted: false,
    source
  };
}

function trustedIpAddressRoute(req, res) {
  req.redisClient.get(req.params.ipAddress, (error, source) => {
    const message = source ? untrustedMessage(source) : trustedMessage;
    res.json(message);
  });
}

module.exports = trustedIpAddressRoute;
