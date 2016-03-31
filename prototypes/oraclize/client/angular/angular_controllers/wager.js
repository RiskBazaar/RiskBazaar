application.controller('wagerController', function($rootScope, $scope, $location, wagerFactory ){


	$scope.makeWager = function(){

		// $scope.wager.challenger = $rootScope.name;
		// $scope.wager.user_id = $rootScope.id;

		// moderator is pre-set to oraclize


		//checking for improperly filled out form 
		if ($scope.wager == undefined){
			$scope.wager_error = "Please fill out form entirely";
			return false;
		} if($scope.wager.event == '' || $scope.wager.event == undefined || $scope.wager.event == null){
			$scope.wager_error_event = 'Enter an Event';
		} if( $scope.wager.event_end_date == '' || $scope.wager.event_end_date == null || $scope.wager.event_end_date == undefined){
			$scope.wager_error_event_date = 'Enter a Date when the event is likely to end';
		} if($scope.wager.opponent == '' || $scope.wager.opponent == null || $scope.wager.opponent == undefined){
			$scope.wager_error_opponent = 'Indicate an opponent for this wager';
		} if($scope.wager.outcome_1 == '' || $scope.wager.outcome_1 == null ||  $scope.wager.outcome_1 == undefined ){
			$scope.wager_error_outcome_1 = 'Enter an outcome for the challenger';
		} if($scope.wager.outcome_2 == '' || $scope.wager.outcome_2 == null ||  $scope.wager.outcome_2 == undefined ){
			$scope.wager_error_outcome_2 = 'Enter the outcome for the opponent';
		} if($scope.wager.challenger_odds == NaN || $scope.wager.stakes_1 == '' || $scope.wager.stakes_1 == undefined || $scope.wager.stakes_1 == null ){
			$scope.wager_error_stakes_1 = 'Enter stakes (pts) for the challenger';
		} if($scope.wager.opponent_odds == NaN || $scope.wager.stakes_2 == '' || $scope.wager.stakes_2 == undefined || $scope.wager.stakes_2 == null ){
			$scope.wager_error_stakes_2 = 'Enter stakes (pts) for the opponent';
		}

		else { //form is filled out correctly

			//determining what day it is today
			var q = new Date();
			var m = q.getMonth();
			var d = q.getDate();
			var y = q.getFullYear();

			var today = new Date(y,m,d);

			wager_date = new Date( $scope.wager.event_end_date );

			//if there is no wager date put in, the default date is today -- not ideal will fix later
			//current issue = not registering when today's date is selected
			if( wager_date == "Invalid Date" ){
				wager_date = date; 
			}

			console.log(today);
			console.log(wager_date);

			var valid_date;
			if( today > wager_date ) {
			    console.log("greater");
			    valid_date = 'no';

			} else if (today == wager_date ){
				valid_date = 'yes';
				 $scope.wager.event_end_date = wager_date;
				 
			}else{
			    console.log("smaller");
			    valid_date = 'yes';
			}

			if(valid_date == "no"){
				$scope.wager_error_event_date = 'Enter a date that is in the future';
				$scope.wager_error = '';
				$scope.wager_error_event = '';
				$scope.wager_error_opponent = '';
				$scope.wager_error_moderator = '';
				$scope.wager_error_stakes_2 = '';
				$scope.wager_error_stakes_1 = '';
				$scope.wager_error_outcome_2 = '';
				$scope.wager_error_outcome_1 = '';
				return false;
			}

			
			//clear errors
			$scope.wager_error = '';
			$scope.wager_error_event = '';
			$scope.wager_error_event_date = '';
			$scope.wager_error_opponent = '';
			$scope.wager_error_moderator = '';
			$scope.wager_error_stakes_2 = '';
			$scope.wager_error_stakes_1 = '';
			$scope.wager_error_outcome_2 = '';
			$scope.wager_error_outcome_1 = '';

			$scope.wager.opponent = $scope.wager.opponent.charAt(0).toUpperCase() + $scope.wager.opponent.slice(1);

			$scope.wager.outcome_1 = $scope.wager.outcome_1.charAt(0).toUpperCase() + $scope.wager.outcome_1.slice(1);
			$scope.wager.outcome_2 = $scope.wager.outcome_2.charAt(0).toUpperCase() + $scope.wager.outcome_2.slice(1);


	    	A = parseFloat($scope.wager.stakes_1);
	    	B = parseFloat($scope.wager.stakes_2);

	    	//do the calculation of the odds
	    	challenger_odds = ( B / (A + B) ) * 100;
	    	opponent_odds = 100 - challenger_odds;

	    	
	    	challenger_odds = Math.round((challenger_odds * 10) / 10)
	    	opponent_odds = Math.round((opponent_odds * 10) / 10)

			$scope.wager.challenger_odds = challenger_odds;
			$scope.wager.opponent_odds = opponent_odds;


			console.log('fINAL WAGER', $scope.wager);

			wagerFactory.makeWager($scope.wager, function(data){

				console.log('back in controller', data);
				if (data.ok == 1){
					$scope.wager_success = "Successfully submitted wager!";

				} else{
					$scope.wager_error = "Error with wager, please create wager again";
					return false;
				}

				// send email notification to all participants in hte contract 


				// -----------------

				if (data != err){

					console.log('data', data);

					address = data.address;
					amount = data.amount;

					// send email notification to all participants that the contract


					info = address + amount;

					info = '1J19TLLqu8DH2cv3ze7g1xZNwyyXWyGLKc$0.00100256'; // this is the multisig address and amount of stakes which may be different for challenger and opponent

					$location.path( '/qr/' + info );

				};

				// -----------------------

			}); //end of wagerFactory call

		} //end of first else

	} //end of makeWager function


	$scope.fundMultisig = function(){
		
	}

});


