// Bitgo API interface to parse through html page and transfers funds to student's address depending on whether certain name exists on page

//bitgo example api code for reference
//https://docs.google.com/document/d/1eIVhuF8qJyAKbRSUKgrZCOFhtRjK82700gVlNGcxfLI/edit

//npm install express 
var express = require('express');

var app = express();

app.listen(8000, function() {
  console.log('server listening on: 8000');
});



//starting JS interpreter and loading module
var BitGo = require('bitgo');
var bitgo = new BitGo.BitGo({ env: 'prod', accessToken: '17ec0eb485ddebd36ada6d9926e48cfe7755f0d1a44222fa4f7f8cb53b86b035'});


function firstFunction(_callback){

    // do something asynchronous 

    // do some asynchronous work

    bitgo.ping({}, function(err,res){ console.dir(res); });
    bitgo.session({}, function(err,res){console.dir(res); });


    setTimeout(Delay, 600);

    function Delay() {

      bitgo.wallets().createWalletWithKeychains({passphrase: 'changeme', label: 'apiwallet'},function(err, res){ console.dir(err); wallet = res.wallet;});

      setTimeout(Delay2, 6000);

      function Delay2(){

        //creating wallet
        var wallet;
        _callback();
      } //end of Delay2 function

    }//end of Delay function

} //end of firstFunction

function secondFunction(){

    // first function runs when it has completed

    firstFunction(function() {

      console.log("wallet", wallet);

      //------------------------------------------------------------------

      //creating a new bitcoin address
       wallet.createAddress({ "chain": 0 }, function callback(err, address) {console.dir(address);});


       //-----------------------------------------------------------------------

      // Adds a policy webhook rule onto an existing wallet and then attempts to send out funds from the wallet, causing the webhook to fire.
      // If the webhook URL returns a 200 status, the transaction is sent; otherwise it is denied.
      // After the transaction is sent, the policy rule is removed
      //
      // Use ngrok and a simple http server to respond to the webhook and see what it sends

      //-----------------------------------------------------------------------


      //setting a policy rule

       var rule = { 
        id: "webhookRule1", 
        type: "webhook",
        action: { type: "deny" },
        condition: { "url": 'https://d7718d1c.ngrok.io/name' } //the ngrok -- your callback uri
      };
      // 'http s://17fc38db.ngrok.com/poll'

      // console.log(rule);

        
        wallet.setPolicyRule(rule, function callback(err, w) { console.dir(w) }); 
        //wallet then accepts rule and waits to receive an update from webhook (coming from our application)
        // webhook connecting our application to bitgo wallet? 

      //-----------------------------------------------------------------------


        //code for the remote endpoint

            //--- THIS CODE NEEDS WORK! -----------------------------

            // Webhook notifications are triggered when the specified event occurs, such as an incoming transaction.
            //this accepts a post request on ngrok/name from wallet? ----???

            app.post('/name', function(req, res){

              console.log(req);

              var webhookData = req.body;

              console.log("WEBHOOD DATA", webhookData);

              var theOutput;

              webhookData.outputs.forEach(function(output){
                if(output.outputWallet !== webhookData.walletId){
                  theOutput = output.outputAddrress;
                }
              })
            }) //end of app.post

            //--- ABOVE CODE NEEDS WORK! -----------------------------


            //---- start of oracle code that will inform how to cosign

      //*******************************************************//
      //This can be substituted with cheerio code (html parsing)
      //*******************************************************//


        //url that we will be getting relevant data (needs to be json data)
        // example:(data.gov) dataset of baby names for the years 2009 through 2013. State of California, Department of Public Health, Birth Records. 2014. Baby Names-2009-2013-CA-CDPH
         var url = "https://cdph.data.ca.gov/api/views/9h3n-g3p4/rows.json?accessType=DOWNLOAD";

         //bitgo example url with poll data
         // var url = "https://www.polleverywhere.com/discourses/llb3d9yZe89MQA7.json?humanize=false&_=%22%20+%20Math.random()*10000000"

         var request = require('request');

         x = request.get(url, function (error, response, body) {

           if (!error && response.statusCode == 200) {


            //pull from html data?
            var Data = JSON.parse(body);

             // console.log("data", Data.data);
             //data[0] //will be the first name only 
             //Data.data will be all arrays of names 

             var name = "";
             var count;
             var outcome;
             var address;

             Data.data.forEach(function(result) {

              // console.log("RESULT", result);
              // 'result' variable = arrays -- each array contains name and other data

              //checking to see if in 2014 more than 100 children were named Alexandra

              //the names are 11th in each array
               if ((result[10] == "alexandra" || result[10] == "ALEXANDRA") && (result[8] == "2014")) {
                //if name matches --> now check for census number

                census_number = parseInt(result[11])//parse string into a number
                console.log(census_number);
                if(census_number > 100){
                  name = result[10];
                  count = census_number;
                  outcome = "name exists";
                  // address = result.value;
                }
               } else{
                outcome = "name does not exist";
               }

             }); //end of forEach function

             if(name != ""){
                outcome = 'name exists';
                // count = undefined;
               }


             console.log('name: ' + name);
             console.log('count: ' + count)
             console.log('result: ' + outcome);


             // if ( ( theOutput === address && name ) || outcome == "name exists") {
              if ( outcome == "name exists") {
               // res.status(200).send({}); //sending to webhook ngrok a status 200 --> so it will execute transaction? 
               
               //next step: send bitcoin to the designated address/recipient based on multisig 
               console.log('WOHOOOO, name is on the list :) ');
               return;

             } else {
               // res.status(400).send({});  //sending to webhook ngrok a status 200 and nothing --> so it will NOT execute transaction?  
               console.log('name not in the list :( ')
             }

           } //end of if statement on line 114

           else {
             console.log('error');
             console.dir(error);
           }

         }); //end of request.get

        }); //end of calling first function call within secondFunction

  //---------------------------------------------------------------

    // })
 } //end of secondFunction



secondFunction(); //calling secondFunction that has firstFunciton called within it


module.exports = bitgo;





//------- other bitgo functions we may want to use later ------------// 

// View Transactions
// wallet.transactions({}, function callback(err, transactions) {
//     console.dir(transactions);
// });

// Send Coins
// wallet.sendCoins({ address: "2NEe9QhKPB2gnQLB3hffMuDcoFKZFjHYJYx", amount: 0.01 * 1e8, walletPassphrase:  "replaceme" }, function(err, result) {
//     console.dir(result);
// });


