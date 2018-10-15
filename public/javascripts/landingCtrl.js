angular.module('hangmeoutApp').controller('landingCtrl', [
'$scope','playersService','$state',

function($scope,playersService,$state){

	$scope.start = function(one,two){
		playersService.addPlayer(one);
		playersService.addPlayer(two);
		$state.go('game');
	}
}]);