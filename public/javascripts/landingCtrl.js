angular.module('hangmeoutApp').controller('landingCtrl', [
'$scope','playersService','$state',

function($scope,playersService,$state){

	$scope.start = function(one,two){
		playersService.addProduct(one);
		playersService.addProduct(two);
		$state.go('game');
	}
}]);