angular.module('BasketItemService', []).factory('BasketItems', ['$http', '$rootScope',
    function($http, $rootScope) {
        var basketService = {};

        basketService.itemCount = 0;

        basketService.broadcastItemCount = function() {
            $rootScope.$broadcast('handleItemCount');
        };


        basketService.getAll = function(callback) {
            caller = this;
            $http({
                method: 'get',
                url: '/api/basketItems/'
            }).success(function(data) {
                caller.itemCount = data.length;
                caller.broadcastItemCount();
                callback(data);
            }).error(function() {
                alert("error");
            });
        };

        basketService.addOne = function(id, callback) {

            caller = this; // BaksetCtrl
            $http({
                method: 'get',
                url: '/api/basketItems/Add/' + id
            }).success(function(data) {
                //setItemCount(10);
                caller.itemCount = data.ItemCount;
                caller.broadcastItemCount();
                callback(null, data);
            }).error(function(err) {
                callback(err);
            });
        };

        basketService.add = function(id, itemCount, callback) {
            caller = this; // BasketCtrl
            var _id = id;
            var _itemCount = itemCount;
            $http({
                method: 'post',
                url: '/api/basketItems/Add',
                data: {
                    id: _id,
                    itemCount: _itemCount
                   }
            }).success(function (data) {
                caller.itemCount = data.ItemCount;
                caller.broadcastItemCount();
                callback(null, data);
            }).error(function(err) {
                callback(err);
            });
        }

        basketService.remove = function (id, itemCount, callback) {
            caller = this;
            var _id = id;
            var _itemCount = itemCount;
            $http({
                method: 'post',
                url: '/api/basketItems/Remove',
                data: {
                    id: _id,
                    itemCount: _itemCount
                   }
            }).success(function (data) {
                caller.itemCount = data.ItemCount;
                caller.broadcastItemCount();
                callback(null, data);
            }).error(function(err) {
                callback(err);
            });
        }

        return basketService;
    }
]);