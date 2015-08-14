// public/js/services/IdentityService.js
angular.module('IdentityService', []).factory('Identity', ['$resource', function($resource) {

    return $resource('/api');

}]);