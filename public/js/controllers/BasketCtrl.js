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
    //$scope.$on('basketUpdate', function(event, args) {alert('caught');});
});