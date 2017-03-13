angular.module('hangmeoutApp', ['ui.router','ngAnimate']).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
                // For any unmatched url, send to /business
                $urlRouterProvider.otherwise("/")
                 
                $stateProvider
                        .state('home', {//State demonstrating Nested views
                            url: "/",
                            templateUrl: "landingpage",
                            controller: "mainCtrl"
                        })
                        .state('game', {//nested state [services is the nested state of business state]
                            url: "/game",
                            templateUrl: "game",
                            controller: "mainCtrl"
                        });

            }]);;



