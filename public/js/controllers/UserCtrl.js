angular.module('UserCtrl', []).controller('UserController', function($scope, Users) {
	$scope.registerUser = function (user) {

		Users.register(user, function(err,data){
			if(err){
				alert(JSON.Stringify(err));
				return;
			}

			if(data.errorCode === 200){
				$scope.loggedInUser = data.payload;
				$window.location = '/';	
			}
			if(data.errorCode !== 200){
				alert(data.message);
			}

		})
	}    
});