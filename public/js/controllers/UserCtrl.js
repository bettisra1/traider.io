angular.module('UserCtrl', []).controller('UserController', function($scope, Users) {
	$scope.phoneNumberPattern = (function () {
		/*var mobileRegex = /^[789]\d{9}$/;*/
		var regxp = /^\d{10}$/;
		return {
        	test: function(value) {
	            if( $scope.requireTel === false ) {
	                return true;
	            }
            	return regexp.test(value);
        	}
        };
	});

	$scope.registerUser = function (user) {

		Users.register(user, function(err,data){
			if(err){
				alert(err);
				return;
			}

			if(data.errorCode === 200){
				alert("User successfully registered");
				$scope.loggedInUser = data.payload;
				//$window.location = '/';	
			}
			if(data.errorCode !== 200){
				alert(data.message);
			}

		})
	}    
});