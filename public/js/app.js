 // public/js/app.js
angular.module('yada', [
	'ui.router', 
	'ngResource', 
	'angularSpinner', 
	'IdentityCtrl', 
	'IdentityService']
);

angular.module('yada').config(function($stateProvider, $locationProvider, $httpProvider) {
  $httpProvider.defaults.withCredentials = true;
  $stateProvider.state('index', { 
    url: '/',
    templateUrl: 'views/identity.html',
    controller: 'IdentityController'
  });
  $locationProvider.html5Mode(true);
}).run(function($state) {
  $state.go('index');
});
