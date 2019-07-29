# api-trusted-ipaddress

An express API that checks if an IP address is trusted by checking if the IP address is in a blacklist of untrusted IP addresses. The API would only be available internally

## Routes

### /trusted/ipaddress/:ipAddress?list=\<listName\>

Check if the IP address sent in the URL string `:ipAddress` is in a list of blacklisted IPs.

Possible values for optional Query parameter `list`:

- basic
- essential
- all

The ipsets of the list are:

- basic: <https://github.com/firehol/blocklist-ipsets#level-1---basic>
- essential: <https://github.com/firehol/blocklist-ipsets#level-2---essentials>
- all: basic and essential together

## /health

Always returns 200, used for load balancer.
