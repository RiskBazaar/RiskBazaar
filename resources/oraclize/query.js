var request = require('request');
​
​
var PROOF_NONE = 0;
var PROOF_TLSNotary = 16;
var PROOF_IPFS = 1;
​
​
​
​
​
function createQuery(query, callback){
  request.post('http://www.oraclize.it/api/v0/query/create', {form: query, json: true}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(body);
    }
  });
}
​
function checkQueryStatus(query_id, callback){
  request.get('http://www.oraclize.it/api/v0/query/'+query_id+'/status', {json: true}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(body);
    }
  });
}
​
​
​
​
// query creation
var query = {
  datasource: 'URL',
  formula: 'json(https://api.kraken.com/0/public/Ticker?pair=ETHUSD).result.XETHZUSD.a.0',
  proof: PROOF_TLSNotary | PROOF_IPFS
};
createQuery(query, function(data){
    query['id'] = data['id'];
    console.log("New query created, id: "+query['id']);
    console.log("Checking query status in 20 seconds..");
    setTimeout(function(){
        // check query status
        checkQueryStatus(query['id'], function(data){ console.log("Query status: "+JSON.stringify(data)); });
      }, 10*2000);
  });
​
​
​
​
​