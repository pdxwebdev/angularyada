angular.module('IdentityCtrl', []).controller('IdentityController', ['$scope', '$http', 'usSpinnerService', 'Identity', function($scope, $http, usSpinnerService, Identity) {
    $scope.startSpin = function(){
        usSpinnerService.spin('spinner-1');
    }
    $scope.stopSpin = function(){
        usSpinnerService.stop('spinner-1');
    }
    $scope.go = function(item) {
      usSpinnerService.spin('spinner-1');
      $http.get($scope.address).then(function(resp) {
        usSpinnerService.stop('spinner-1');
        console.log(resp.data);
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