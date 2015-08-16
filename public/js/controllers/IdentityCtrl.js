angular.module('IdentityCtrl', []).controller('IdentityController', ['$scope', '$http', 'usSpinnerService', 'Identity', function($scope, $http, usSpinnerService, Identity) {
    
    $scope.startSpin = function(){
        usSpinnerService.spin('spinner-1');
    }
    $scope.stopSpin = function(){
        usSpinnerService.stop('spinner-1');
    }
    $scope.go = function(item) {
      $scope.editMode = false;
      $scope.identityObject = JSON.parse($scope.identitySerialized);
      usSpinnerService.spin('spinner-1');
      $http.post($scope.address, $scope.identityObject).then(function(resp) {
        usSpinnerService.stop('spinner-1');
        if ($scope.identityObject.public_key === resp.data.public_key) {
          $scope.editMode = true;
        } else {
          $scope.editMode = false;
        }
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
      }, function(err) {
        console.error('ERR', err);
      });
    }
}]);