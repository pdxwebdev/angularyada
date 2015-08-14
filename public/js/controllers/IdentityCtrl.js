angular.module('IdentityCtrl', []).controller('IdentityController', ['$scope', '$http', 'usSpinnerService', 'Identity', function($scope, $http, usSpinnerService, Identity) {
    
    $scope.startSpin = function(){
        usSpinnerService.spin('spinner-1');
    }
    $scope.stopSpin = function(){
        usSpinnerService.stop('spinner-1');
    }
    $scope.go = function(item) {
      usSpinnerService.spin('spinner-1');
	  $http.post('http://yadaproject.com/api/getCounts').then(function(resp) {
        usSpinnerService.stop('spinner-1');
        $scope.identity = resp.data;
      }, function(err) {
        console.error('ERR', err);
      });
	}
}]);