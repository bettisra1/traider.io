angular.module('BasketCtrl', []).controller('BasketController', function($scope, BasketItems) {
    BasketItems.getAll(function(data) {
        $scope.products = data;
    });

    $scope.basketItemCount = BasketItems.itemCount;

    $scope.$on('handleItemCount', function() {
        $scope.basketItemCount = BasketItems.itemCount;
    });

    $scope.getTotal = function() {
   		var total = 0;
   		for (var i = $scope.basketItemCount - 1; i >= 0; i--) {
   			total = $scope.products[i].price*$scope.products[i].itemCount + total;
   		}

   		return total;
    }

    $scope.removeFromBasket = function(product) {
    	console.log(product);
    	console.log("basketItemCount: "+ $scope.basketItemCount);
    	BasketItems.remove(product.productId, product.itemCount, function(err, data){
            $scope.products = data;
            $scope.$emit('basketUpdate');
            
            if(err){
                alert(err);
                return;
            }
        });
 		console.log($scope.products);
 		console.log("basketItemCount: "+ $scope.basketItemCount);
    }

    $scope.reduceItem = function(product) {
    	BasketItems.remove(product.productId, 1, function(err, data){
    		$scope.products = data;	
    		$scope.$emit('basketUpdate');
    		
    		if(err){
                alert(err);
                return;
            }
    	});
    }

    $scope.addItem = function(product) {
    	BasketItems.add(product.productId, 1, function(err, data) {
    		$scope.products = data;
    		$scope.$emit('basketUpdate');
    		
    		if(err){
                alert(err);
                return;
            }
    	});
    }
    //$scope.$on('basketUpdate', function(event, args) {alert('caught');});
});