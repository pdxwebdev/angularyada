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
        console.log(resp.data.data);
        $scope.identity = resp.data;
      }, function(err) {
        console.error('ERR', err);
      });
	}
}]);