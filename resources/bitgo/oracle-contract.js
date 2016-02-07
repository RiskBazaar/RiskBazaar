app.post('/poll', function(req, res, next) {
 var webhookData = req.body;
 var theOutput;
 webhookData.outputs.forEach(function(output) {
   if (output.outputWallet !== webhookData.walletId) { theOutput = output.outputAddress; }
 });

 var url = "https://www.polleverywhere.com/discourses/llb3d9yZe89MQA7.json?humanize=false&_=" + Math.random()*10000000;

 var request = require('request');
 x = request.get(url, function (error, response, body) {
   if (!error && response.statusCode == 200) {
     var pollData = JSON.parse(response.body);
     console.dir(pollData.results);
     var winningAddress = '';
     var winningUpvotes = 0;
     pollData.results.forEach(function(result) {
       if (result.upvotes > winningUpvotes) {
         winningAddress = result.value;
       }
     });
     console.log('winning address: ' + winningAddress);
     if (theOutput === winningAddress) {
       res.status(200).send({});
     } else {
       res.status(400).send({});
     }
   } else {
     console.log('error');
     console.dir(error);
   }
 });
});