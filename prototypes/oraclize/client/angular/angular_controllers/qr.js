application.controller('qrController', function($rootScope, $routeParams, $scope, $location){

	split_string = $routeParams.info.split('$');
	multisig_address = split_string[0];
	amount = split_string[1];

	$scope.qr = 'https://chart.googleapis.com/chart?chs=450x450&cht=qr&chl=bitcoin:'+ multisig_address +'?amount=' + amount;


	$scope.Sign = function(){
		console.log($scope.private_key);
		// use this to sign transaction 

		

	}


});