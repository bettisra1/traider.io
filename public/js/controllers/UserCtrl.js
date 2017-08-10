angular.module('UserCtrl', []).controller('UserController', function($scope, Users) {
	$scope.registerUser = function (user) {

		Users.register(user, function(err,data){
			if(err){
				alert(err);
				return;
			}
			$scope.loggedInUser = data;
		})
	}    
});