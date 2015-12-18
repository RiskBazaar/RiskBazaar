var request = require('request');
var fs = require("fs");
var path = require("path");

var URL = "https://api.chain.com";
var PEM = fs.readFileSync(path.join(__dirname, "./chain.pem"));

module.exports = {
  getKey: function() {
    return this.key || 'GUEST-TOKEN';
  },
  getApiKeyId: function() {
    return this.apiKeyId || this.getKey();
  },
  getApiKeySecret: function() {
    return this.apiKeySecret;
  },
  getAuth: function() {
    return {user: this.getApiKeyId(), pass: this.getApiKeySecret()};
  },
  getVersion: function() {
    return this.version || 'v1';
  },
  getBlockChain: function() {
    return this.blockChain || 'bitcoin';
  },
  getBaseURL: function() {
    return URL + '/' + this.getVersion() + '/' + this.getBlockChain();
  },
  getWebhooksURL: function() {
    return URL + '/' + this.getVersion();
  },
  getAddress: function(address, cb) {
    request({
      method: 'GET',
      uri: this.getBaseURL() + '/addresses/' + address,
      strictSSL: true,
      cert: PEM,
      auth: this.getAuth(),
    }, function(err, msg, resp) {
      cb(err, JSON.parse(resp));
    });
  },
  getAddresses: function(addresses, cb) {
    this.getAddress(addresses.join(','), cb);
  },
  getAddressTransactions: function(address, options, cb) {
    options = options || {};
    if (typeof(options) == 'function') {
        cb = options;
        options = {};
    }
    request({
      method: 'GET',
      uri: this.getBaseURL() + '/addresses/' + address + '/transactions',
      qs: options,
      strictSSL: true,
      cert: PEM,
      auth: this.getAuth(),
    }, function(err, msg, resp) {
      cb(err, JSON.parse(resp));
    });
  },
  getAddressesTransactions: function(addresses, options, cb) {
    this.getAddressTransactions(addresses.join(','), options, cb);
  },
  getAddressUnspents: function(address, cb) {
    request({
      method: 'GET',
      uri: this.getBaseURL() + '/addresses/' + address + '/unspents',
      strictSSL: true,
      cert: PEM,
      auth: this.getAuth(),
    }, function(err, msg, resp) {
      cb(err, JSON.parse(resp));
    });
  },
  getAddressesUnspents: function(addresses, cb) {
    this.getAddressUnspents(addresses.join(','), cb);
  },
  getAddressOpReturns: function(address, cb) {
    request({
      method: 'GET',
      uri: this.getBaseURL() + '/addresses/' + address + '/op-returns',
      strictSSL: true,
      cert: PEM,
      auth: this.getAuth(),
    }, function(err, msg, resp) {
      cb(err, JSON.parse(resp));
    });
  },
  getTransaction: function(hash, cb) {
    request({
      method: 'GET',
      uri: this.getBaseURL() + '/transactions/' + hash,
      strictSSL: true,
      cert: PEM,
      auth: this.getAuth(),
    }, function(err, msg, resp) {
      cb(err, JSON.parse(resp));
    });
  },
  getTransactionOpReturn: function(hash, cb) {
    request({
      method: 'GET',
      uri: this.getBaseURL() + '/transactions/' + hash + '/op-return',
      strictSSL: true,
      cert: PEM,
      auth: this.getAuth(),
    }, function(err, msg, resp) {
      cb(err, JSON.parse(resp));
    });
  },
  sendTransaction: function(hex, cb) {
    request({
      method: 'PUT',
      uri: this.getBaseURL() + '/transactions',
      strictSSL: true,
      cert: PEM,
      auth: this.getAuth(),
      json: {hex: hex},
    }, function(err, msg, resp) {
      cb(err, resp);
    });
  },
  getBlock: function(hashOrHeight, cb) {
    request({
      method: 'GET',
      uri: this.getBaseURL() + '/blocks/' + hashOrHeight,
      strictSSL: true,
      cert: PEM,
      auth: this.getAuth(),
    }, function(err, msg, resp) {
      cb(err, JSON.parse(resp));
    });
  },
  getLatestBlock: function(cb) {
    request({
      method: 'GET',
      uri: this.getBaseURL() + '/blocks/latest',
      strictSSL: true,
      cert: PEM,
      auth: this.getAuth(),
    }, function(err, msg, resp) {
      cb(err, JSON.parse(resp));
    });
  },
  getBlockOpReturns: function(hashOrHeight, cb) {
    request({
      method: 'GET',
      uri: this.getBaseURL() + '/blocks/' + hashOrHeight + '/op-returns',
      strictSSL: true,
      cert: PEM,
      auth: this.getAuth(),
    }, function(err, msg, resp) {
      cb(err, JSON.parse(resp));
    });
  },
  createWebhookUrl: function(url, id, cb) {
    var body = {};
    body['url'] = url;
    if(id != null) {
      body['id'] = id;
    }
    request({
      method: 'POST',
      uri: this.getWebhooksURL() + '/webhooks',
      strictSSL: true,
      cert: PEM,
      auth: this.getAuth(),
      json: body,
    }, function(err, msg, resp) {
      cb(err, resp);
    });
  },
  listWebhookUrls: function(cb) {
    request({
      method: 'GET',
      uri: this.getWebhooksURL() + '/webhooks',
      strictSSL: true,
      cert: PEM,
      auth: this.getAuth(),
    }, function(err, msg, resp) {
      cb(err, JSON.parse(resp));
    });
  },
  updateWebhookUrl: function(id, url, cb) {
    request({
      method: 'PUT',
      uri: this.getWebhooksURL() + '/webhooks/' + id,
      strictSSL: true,
      cert: PEM,
      auth: this.getAuth(),
      json: {url: url},
    }, function(err, msg, resp) {
      cb(err, resp);
    });
  },
  deleteWebhookUrl: function(id, cb) {
    request({
      method: 'DELETE',
      uri: this.getWebhooksURL() + '/webhooks/' + id,
      strictSSL: true,
      cert: PEM,
      auth: this.getAuth(),
    }, function(err, msg, resp) {
      cb(err, JSON.parse(resp));
    });
  },
  createWebhookEvent: function(webhookId, opts, cb) {
    if(opts['event'] == null) {
      opts['event'] = 'address-transaction';
    }
    if(opts['block_chain'] == null) {
      opts['block_chain'] = this.getBlockChain();
    }
    if(opts['address'] == null) {
      cb('Missing address parameter', null);
    }
    if(opts['confirmations'] == null) {
      opts['confirmations']  = 1;
    }
    request({
      method: 'POST',
      uri: this.getWebhooksURL() + '/webhooks/' + webhookId+ '/events',
      strictSSL: true,
      cert: PEM,
      auth: this.getAuth(),
      json: opts
    }, function(err, msg, resp) {
      cb(err, resp);
    });
  },
  listWebhookEvents: function(webhookId, cb) {
    request({
      method: 'GET',
      uri: this.getWebhooksURL() + '/webhooks/' + webhookId + '/events',
      strictSSL: true,
      cert: PEM,
      auth: this.getAuth(),
    }, function(err, msg, resp) {
      cb(err, JSON.parse(resp));
    });
  },
  deleteWebhookEvent: function(webhookId, eventType, address, cb) {
    var url = this.getWebhooksURL();
    url += '/webhooks/' + webhookId;
    url += '/events/' + eventType;
    url += '/' + address;
    request({
      method: 'DELETE',
      uri: url,
      strictSSL: true,
      cert: PEM,
      auth: this.getAuth(),
    }, function(err, msg, resp) {
      cb(err, JSON.parse(resp));
    });
  }
};
