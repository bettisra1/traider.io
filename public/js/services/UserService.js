angular.module('UserService', []).factory('Users', ['$http',
    function($http) {
    	var userService = {};

    	userService.register = function(user, callback) {
    		var _user = user;
    		console.log("User:"+user);
    		$http({
    			method: 'post',
    			url: '/api/users',
    			data: _user
    		}).success(function(data){
    			callback(null,data);
    		}).error(function(err){
    			callback(err);
    		});
    	}

    	return userService;
    }
]);