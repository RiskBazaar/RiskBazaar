
var mongoose = require('mongoose');
var Wager = mongoose.model('Wager');
var bitcore = require('bitcore-lib');
var request = require('request');
// var OraclizeQuery = require('./../../oracle/query.js');
// var OraclizeContract = require('./../../oracle/contract.js');


// -----------  Oraclize functions  ------------------- //

// Oraclize is 'god' moderator: creates transactions, last to sign multisig, used as moderator everytime, opponent and challenger do not touch result 
//Oraclize using Wolfram 

// good example events pertaining to time, trivia, dates, weather, public numbers about population like how many people have diabetes, comparing ages
// Basically anything that can be answered by Wolfram alpha 

function createContract(contract, callback){
  request.post('http://www.oraclize.it/api/v0/contract/create', {form: contract, json: true}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(body);
    }
  });
}

function checkContractStatus(contract_id, callback){
  request.get('http://www.oraclize.it/api/v0/contract/'+contract_id+'/status', {json: true}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(body);
    }
  });
}

function createQuery(query, callback){
  request.post('http://www.oraclize.it/api/v0/query/create', {form: query, json: true}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(body);
    }
  });
}

function checkQueryStatus(query_id, callback){
  request.get('http://www.oraclize.it/api/v0/query/' + query_id + '/status', {json: true}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(body);
    }
  });
}

// -------------------------------------------------- //


module.exports = (function() {

	return {

		new_wager: function(req, res){

			var PROOF_NONE = 0;
			var PROOF_TLSNotary = 16;
			var PROOF_IPFS = 1;

			// *** Contract Creation *** // 

			// in our example 2 participants (Challenger and Opponent) would provide their public keys to initiated contract 

			// --------------------------------------------------- //
			// ------------ CHALLENGER TRANSACTION --------------- //
			// --------------------------------------------------- //

			var privkey1 = bitcore.PrivateKey(); // 1st random privkey
			// console.log("Privkey1 wif: "+privkey1.toWIF());
			var pubkey1 = privkey1.toPublicKey(); // corresponding pubkey derived from privkey1

			var privkey2 = bitcore.PrivateKey(); // 2nd random privkey
			// console.log("Privkey2 wif: "+privkey2.toWIF());
			var pubkey2 = privkey2.toPublicKey(); // corresponding pubkey derived from privkey2

			//Bitcoin Addresses 
			address1 = pubkey1.toAddress().toString();
			address2 = pubkey2.toAddress().toString();

			//in the wager form we will be getting Bitcoin addresses from the users 

			var pubkey3 = bitcore.PublicKey("031ad3887e76f50116fec30ab6fc9b871d9e605db639cf3b0b23aa5b67863312b8"); // 3rd pubkey, this is the Oraclize one!

			//creating multisig address to send stakes to 
			var multisig = bitcore.Address.createMultisig([pubkey1, pubkey2, pubkey3], 2, 'livenet').toString();
			console.log("New multisig addr: "+multisig);

			var utxo = [];
			//[{"address":multisig,"txid":"6cafc581c1e747df96048a9c03be0cacc98a89d3b088c2ef62533d5f016d9d7b","vout":1,"ts":1453412204,"scriptPubKey":"76a914648a4310b84426f426398ef27e3388a4d2c05a2888ac","amount":0.9762395,"confirmations":1477,"confirmationsFromCache":false},{"address":multisig,"txid":"76b3fc0f8838a86db5def078a73067b5539a0ce15412134f7ea6b6747b145bb3","vout":1,"ts":1453374106,"scriptPubKey":"76a914648a4310b84426f426398ef27e3388a4d2c05a2888ac","amount":0.00227959,"confirmations":1540,"confirmationsFromCache":false}]; 

			  // var utxo = {
			  //   txid: '7f3b688cb224ed83e12d9454145c26ac913687086a0a62f2ae0bc10934a4030f',
			  //   vout: 0,
			  //   address: 'n4McBrSkw42eYGX5YMACGpkGUJKL3jVSbo',
			  //   scriptPubKey: '2103c9594cb2ebfebcb0cfd29eacd40ba012606a197beef76f0269ed8c101e56ceddac',
			  //   amount: 50,
			  //   confirmations: 104,
			  //   spendable: true
			  // };

			// FIXME: this needs to be changed since its dummy data -> the right format is the one from Insight - get in from "https://insight.bitpay.com/api/addr/" + addr + "/utxo"

			//https://insight.bitpay.com/api/addr/36BMPixGJwZXbEmXUp9W4yUBSAEyg4QMAY/utxo

			var tx = bitcore.Transaction().from(utxo, [pubkey1, pubkey2, pubkey3], 2); // let's create the 2-of-3 partially signed tx we want the oracle to sign&broadcast (once the event is verified)

			var destAddr = address1; //the destination should be challenger address

			var amountToSend = parseFloat(req.stakes_1) + parseFloat(req.stakes_2); //send total stakes from both challenger and opponent amount to multisig address 

			tx.to(destAddr, bitcore.Unit.fromBTC(amountToSend).toSatoshis()); //send full amount to challenger's address 

			tx.fee(bitcore.Unit.fromBTC("0.0001").toSatoshis()); 

	// 		challenger_info = {
	// 			multisig_address: multisig, //multisig address challenger will need to fund
	// 			amount: req.stakes_1 //amount they are putting up in this wager
	// 		}
	// 		res.json(challenger_info);


	//--- GO TO FRONTEND TO HAVE BOTH OPPONENT AND CHALELNGER SEND FUNDS TO MULTISIG ADDRESS ----// 

	//pause to ACCEPT THE WAGER WHICH EFFECTIVELY MEANS THEY WILL SIGN THE TX WHERE THEY WIN
	// when user accept the wager --> 1) fund multisig address  2) sign TX with their priv key


	 //  AFTER MULTISIG ADDRESS IS FUNDED BY BOTH CHAELLENGER AND OPPOMENT, HAVE SIGNED THE TRANSACTIONS --- //

	// 		tx.sign(privkey1);//this is signed by the challenger and waiting for Oraclize to sign
	// 		var txstr = tx.serialize(true);


			//actions to have Oraclize perform once they have found a result
			//any actions , send email, notification, does not need to be signing tx or broadcasting 

			// var actions = [
			//    {
			//        type: "signtx",
			//        params: {
			//            tx_type: "2-of-3",
			//            tx: txstr
			//        }
			//    },
			//    {
			//        type: "broadcasttx",
			//        params: {
			//            tx: "this[0]"
			//        }
			//    },
			//    {
			//    		type:"notification",
			//    		params: {
			//    			to: ,
			//    			message:
			//    		}
			//    }
	// 		];


	// ** Contract for Oraclize ** //

		//calculate the when variable
		//timestamp format that starts when the event outcome should be available

		// timestamp = req.event_end_date


			var contract = {
			  datasource: 'WolframAlpha', //'URL',
			  formula: req.event,  //Our example is ""
			  // check_op: 'less_than', //this can be "greater_than", "less_than", "regex_match", "check_value", "!check_value", "contains", "!contains"
			  check_value: req.outcome_1, //the outcome predicted by challenger
			  interval: '1d', // can be "1m", "1d", "31d"
			  when : timestamp, //timestamp format that starts when the event outcome should be available
			  duration: 60*3, //expiration  ex: 60*3
			  actions: JSON.stringify(actions), //actions object we created above
			  proof: PROOF_TLSNotary | PROOF_IPFS
			};


	// 		var query = {
	// 		  datasource: 'WolframAlpha',
	// 		  formula: req.event,
	// 		  check_value: req.outcome_1,
	// 		  proof: PROOF_TLSNotary | PROOF_IPFS
	// 		};


			createContract(contract, function(data){

			    contract['id'] = data['id'];
			    console.log("New contract created, id: "+contract['id']);

			    // setInterval(function(){ //ideally query should be delayed until the EVENT END DATE of the contract

					createQuery(query, function(data){
					    query['id'] = data['id'];
					    console.log("New query created, id: "+query['id']);

					    // setTimeout(function(){
					        // check query status
					        checkQueryStatus(query['id'], function(data){ 
					        	console.log("Query status: "+JSON.stringify(data)); 
					        	console.log('results', data.result)
					    	});
					      // }, 2000); //should check once a day after the expiry date 

					    checkContractStatus(contract['id'], function(data){ console.log("Contract status: "+JSON.stringify(data)); });

					  });

			        // check contract status
			      // }, 2);

			});



createContract(contract, function(data){
    contract['id'] = data['id'];
    console.log("New contract created, id: "+contract['id']);

    createQuery(query, function(data){
    	query['id'] = data['id'];
    	console.log('New query created, id: ' + query['id']);

    	checkQueryStatus(query['id'], function(data){
    		console.log('Query status: '+ JSON.stringify(data));
    		console.log('results', data.result);
    	}) //end of checkQueryStatus function

	    setInterval(function(){
	        // check contract status
	        checkContractStatus(contract['id'], function(data){ console.log("Contract status: "+JSON.stringify(data)); });
	    }, 3600 * 1000);


    }) //end of createQuery function

  }); //end of createContract function

			



			// --------------------------------------------------- //
			// ------------ OPPONENT TRANSACTION --------------- //
			// --------------------------------------------------- //

			// *** Contract Creation *** // 

			// var utxo2 = [] //[{"address":multisig,"txid":"6cafc581c1e747df96048a9c03be0cacc98a89d3b088c2ef62533d5f016d9d7b","vout":1,"ts":1453412204,"scriptPubKey":"76a914648a4310b84426f426398ef27e3388a4d2c05a2888ac","amount":0.9762395,"confirmations":1477,"confirmationsFromCache":false},{"address":multisig,"txid":"76b3fc0f8838a86db5def078a73067b5539a0ce15412134f7ea6b6747b145bb3","vout":1,"ts":1453374106,"scriptPubKey":"76a914648a4310b84426f426398ef27e3388a4d2c05a2888ac","amount":0.00227959,"confirmations":1540,"confirmationsFromCache":false}]; // FIXME: this needs to be changed since its dummy data -> the right format is the one from Insight - get in from "https://insight.bitpay.com/api/addr/"+addr+"/utxo"
			// var tx2 = bitcore.Transaction().from(utxo, [pubkey1, pubkey2, pubkey3], 2); // let's create the 2-of-3 partially signed tx we want the oracle to sign&broadcast (once the event is verified)
			// var destAddr2 = address2; //the destination should be opponent created from public key

			// var amountToSend2 = req.stakes_2; // 50-50 odds
			// tx2.to(destAddr2, bitcore.Unit.fromBTC(amountToSend2).toSatoshis());
			// tx2.fee(bitcore.Unit.fromBTC("0.0001").toSatoshis());
			// tx2.sign(privkey1_2); //signed by opponent and waiting to be signed by Oraclize when result is confirmed
			// var txstr2 = tx2.serialize(true);

			// // console.log("rawtx: "+console.log(txstr2));

			// var actions2 = [
			//    {
			//        type: "signtx",
			//        params: {
			//            tx_type: "2-of-3",
			//            tx: txstr2
			//        }
			//    },
			//    {
			//        type: "broadcasttx",
			//        params: {
			//            tx: "this[0]"
			//        }
			//    }
			// ];

			// console.log('actions2', actions2)

			// 

			// var contract2 = {
			//   datasource: 'WolframAlpha', //'URL',
			//   formula: req.event, //same event 
			//   // check_op: 'less_than',
			//   check_value: req.outcome_2,
			//   interval: '1m',
			//   duration: 60*3,
			//   actions: JSON.stringify(actions2)
			//   //proof: PROOF_TLSNotary | PROOF_IPFS
			// };

			// console.log('contract2', contract2)

			// createContract(contract, function(data){
			//     contract['id'] = data['id'];
			//     console.log("New contract created, id: "+contract['id']);
			//     console.log("Checking contract status every 10 seconds..");
			//     setInterval(function(){
			//         // check contract status
			//         checkContractStatus(contract['id'], function(data){ console.log("Contract status: "+JSON.stringify(data)); });
			//       }, 10*1000);
			//   });



// ------------------------------------------------------------------------------------------ //


			// var add_wager = {
			// 	event:req.event,
			// 	challenger: req.challenger,
			// 	outcome_1: req.outcome_1,
			// 	opponent: req.opponent,
			// 	outcome_2: req.outcome_2,
			// 	stakes_1: req.stakes_1,
			// 	stakes_2: req.stakes_2,
			// 	moderator: req.moderator,
			// 	event_end_date: req.event_end_date,
			// 	expiry_date: expiry_date,
			// 	status: 'INITIATED'
			// };

			// console.log(add_wager)

			// challenger_info = {
			// 	approved: 'yes',
			// 	address: address1,
			// 	amount: req.stakes_1
			// }

			// opponent_info = {
			// 	approved: 'yes',
			// 	address: address2,
			// 	amount: req.stakes_2
			// }


			// res.json(opponent_info);

		}

	}
})();
