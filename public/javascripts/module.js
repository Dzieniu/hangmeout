angular.module('hangmeoutApp', ['ui.router','ngAnimate']).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
                // For any unmatched url, send to /business
                $urlRouterProvider.otherwise("/")
                 
                $stateProvider
                        .state('home', {//State demonstrating Nested views
                            url: "/",
                            templateUrl: "landingpage",
                            controller: "landingCtrl"
                        })
                        .state('addriddle', {//State demonstrating Nested views
                            url: "/addriddle",
                            templateUrl: "addriddle",
                            controller: "gameCtrl"
                        })
                        .state('game', {//nested state [services is the nested state of business state]
                            url: "/game",
                            templateUrl: "game",
                            controller: "gameCtrl"
                        });

            }]).

service('playersService', function() {
  var productList = [];

  var addProduct = function(newObj) {
      if(productList.length==0){
        productList[0]=newObj;
      }else if(productList.length==1){
        productList[1]=newObj;
      }else{
        productList = []
        productList[0]=newObj;
      }
  };

  var getProducts = function(){
      return productList;
  };
  return {
    addProduct: addProduct,
    getProducts: getProducts
  };

});;



