var bitcore = require('bitcore-lib');
var request = require('request');
​
​
//console.log(privateKey0);
//console.log(privateKey1);
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
function createContract(contract, callback){
  request.post('http://www.oraclize.it/api/v0/contract/create', {form: contract, json: true}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(body);
    }
  });
}
​
function checkContractStatus(contract_id, callback){
  request.get('http://www.oraclize.it/api/v0/contract/'+contract_id+'/status', {json: true}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(body);
    }
  });
}
​
​
​
​
// contract creation
​
​
var privkey1 = bitcore.PrivateKey(); // 1st random privkey
console.log("Privkey1 wif: "+privkey1.toWIF());
var pubkey1 = privkey1.toPublicKey();
var privkey2 = bitcore.PrivateKey(); // 2nd random privkey
console.log("Privkey2 wif: "+privkey2.toWIF());
var pubkey2 = privkey2.toPublicKey();
​
var pubkey3 = bitcore.PublicKey("031ad3887e76f50116fec30ab6fc9b871d9e605db639cf3b0b23aa5b67863312b8"); // 3rd pubkey, this is the Oraclize one!
​
var multisig = bitcore.Address.createMultisig([pubkey1, pubkey2, pubkey3], 2, 'livenet').toString();
console.log("New multisig addr: "+multisig);
​
​
var utxo = [] //[{"address":multisig,"txid":"6cafc581c1e747df96048a9c03be0cacc98a89d3b088c2ef62533d5f016d9d7b","vout":1,"ts":1453412204,"scriptPubKey":"76a914648a4310b84426f426398ef27e3388a4d2c05a2888ac","amount":0.9762395,"confirmations":1477,"confirmationsFromCache":false},{"address":multisig,"txid":"76b3fc0f8838a86db5def078a73067b5539a0ce15412134f7ea6b6747b145bb3","vout":1,"ts":1453374106,"scriptPubKey":"76a914648a4310b84426f426398ef27e3388a4d2c05a2888ac","amount":0.00227959,"confirmations":1540,"confirmationsFromCache":false}]; // FIXME: this needs to be changed since its dummy data -> the right format is the one from Insight - get in from "https://insight.bitpay.com/api/addr/"+addr+"/utxo"
var tx = bitcore.Transaction().from(utxo, [pubkey1, pubkey2, pubkey3], 2); // let's create the 2-of-3 partially signed tx we want the oracle to sign&broadcast (once the event is verified)
var destAddr = "1AAcCo21EUc1jbocjssSQDzLna9Vem2UN5";
var amountToSend = "0.001";
tx.to(destAddr, bitcore.Unit.fromBTC(amountToSend).toSatoshis());
tx.fee(bitcore.Unit.fromBTC("0.0001").toSatoshis());
tx.sign(privkey1);
var txstr = tx.serialize(true);
​
console.log("rawtx: "+console.log(txstr));
​
var actions = [
   {
       type: "signtx",
       params: {
           tx_type: "2-of-3",
           tx: txstr
       }
   },
   {
       type: "broadcasttx",
       params: {
           tx: "this[0]"
       }
   }
];
​
var contract = {
  datasource: 'WolframAlpha', //'URL',
  formula: 'random number between 1 and 1000', //'json(https://api.kraken.com/0/public/Ticker?pair=ETHUSD).result.XETHZUSD.a.0',
  check_op: 'less_than',
  check_value: '300',
  interval: '1m',
  duration: 60*3,
  actions: JSON.stringify(actions)
  //proof: PROOF_TLSNotary | PROOF_IPFS
};
createContract(contract, function(data){
    contract['id'] = data['id'];
    console.log("New contract created, id: "+contract['id']);
    console.log("Checking contract status every 10 seconds..");
    setInterval(function(){
        // check contract status
        checkContractStatus(contract['id'], function(data){ console.log("Contract status: "+JSON.stringify(data)); });
      }, 10*1000);
  });
​
​
​
​
​