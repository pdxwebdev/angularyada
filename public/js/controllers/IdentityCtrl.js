angular.module('IdentityCtrl', []).controller('IdentityController', ['$scope', '$http', 'usSpinnerService', 'Identity', 'Config', function($scope, $http, usSpinnerService, Identity, Config) {
    $scope.address = Config.friend;
    $scope.idaddress = Config.identity;
    $scope.context = Config.context;
    $scope.startSpin = function(){
        usSpinnerService.spin('spinner-1');
    }
    $scope.stopSpin = function(){
        usSpinnerService.stop('spinner-1');
    }
    $scope.go = function(item) {
      $scope.editMode = false;
      usSpinnerService.spin('spinner-1');
      $http.get($scope.address).then(function(resp) {
        usSpinnerService.stop('spinner-1');
        $scope.editMode = false;
        $scope.identity = resp.data;
        $scope.addressForm.$setPristine(true);
        //TODO: Send this friend to your server
        $http.post(
          $scope.idaddress + 'postFriend/', 
          {
            public_key: resp.data.public_key, 
            data: resp.data, 
            METHOD: 'postFriend'
          }
        ).then(function(resp) {
          console.log(resp)
        }, function(err) {
          console.error('ERR', err);
        });
      }, function(err) {
        console.error('ERR', err);
      });
    }
    $scope.goid = function(item) {
      $scope.editMode = false;
      $scope.identityObject = JSON.parse($scope.identitySerialized);
      usSpinnerService.spin('spinner-1');
      $http.post($scope.idaddress, $scope.identityObject).then(function(resp) {
        usSpinnerService.stop('spinner-1');
        $scope.editMode = true;
        $scope.identity = resp.data;
        $scope.addressForm.$setPristine(true);
      }, function(err) {
        console.error('ERR', err);
      });
    }
    $scope.save = function(item) {
      time = new Date();
      console.log($scope.identity);
      $scope.identity.data.identity.modified = time.getTime()
      usSpinnerService.spin('spinner-1');
      $http.post($scope.address + 'postIdentity/', {'METHOD':'postIdentity', 'data':$scope.identity}).then(function(resp) {
        usSpinnerService.stop('spinner-1');
        console.log(resp.data);
        //TODO: update all contexts on save
      }, function(err) {
        console.error('ERR', err);
      });
    }
}]);