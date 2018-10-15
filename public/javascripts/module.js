angular.module('hangmeoutApp', ['ui.router','ngAnimate'])
.service('playersService', function() {
  var playersList = [];

  var addPlayer = function(newObj) {
      if(playersList.length==0){
        playersList[0]=newObj;
      }else if(playersList.length==1){
        playersList[1]=newObj;
      }else{
        playersList = []
        playersList[0]=newObj;
      }
  };

  var getPlayers = function(){
      return playersList;
  };
  return {
    addPlayer: addPlayer,
    getPlayers: getPlayers
  };

})

.config(['$stateProvider', '$urlRouterProvider',
function($stateProvider, $urlRouterProvider){
                $urlRouterProvider.otherwise("/")
                 
                $stateProvider
                        .state('home', {
                            url: "/",
                            templateUrl: "landingpage",
                            controller: "landingCtrl"
                        })
                        .state('addriddle', {
                            url: "/addriddle",
                            templateUrl: "addriddle",
                            controller: "gameCtrl"
                        })
                        .state('game', {
                            url: "/game",
                            templateUrl: "game",
                            controller: "gameCtrl",
                        });
            }])




