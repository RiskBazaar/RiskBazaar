application.factory('wagerFactory', function($http){
	var factory = {};

	factory.makeWager = function(info, callback){
		console.log(info);

		$http.post('/new_wager', info).success(function(output){
			callback(output);
		})
	}

	return factory;
});