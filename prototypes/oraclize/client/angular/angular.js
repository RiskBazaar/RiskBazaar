var application = angular.module('application',[]);

//what does this do??
application.directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        };
    });


application.config(function($routeProvider){

	$routeProvider

	.when('/',{ templateUrl: 'partials/making_a_wager.html' })
    .when('/qr/:info',{ templateUrl: 'partials/qr.html' })

	.otherwise( { redirectTo: "/" });

});