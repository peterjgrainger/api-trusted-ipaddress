# api-trusted-ipaddress

An express API that checks if an IP address is trusted by checking if the IP address is in a blacklist of untrusted IP addresses. The API would only be available internally

## Routes

### /trusted/ipaddress/:ipAddress?list=\<listName\>

Check if the IP address sent in the URL string `:ipAddress` is in a list of blacklisted IPs.

The ipsets of the list are those defined in:

- basic: <https://github.com/firehol/blocklist-ipsets#level-1---basic>
- essential: <https://github.com/firehol/blocklist-ipsets#level-2---essentials>

### Response

#### IP Address not found in blacklist

If IP found in list

Status code: 200

```json
{
  "trusted": true
}
```

#### IP Address found in blacklist

Status code: 200

```json
{
  "trusted": false,
  "source": "<list-name e.g. feodo>"
}
```

## /health

Always returns 200, used for load balancer.
