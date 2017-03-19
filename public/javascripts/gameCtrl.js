angular.module('hangmeoutApp').controller('gameCtrl', [
'$scope','$http','playersService','$state',

function($scope,$http,playersService,$state){
	$scope.showModal = false;
    $scope.buttonClicked = "";
    $scope.playersName = playersService.getProducts();
	$scope.isRefresh = function(){
    	if($scope.playersName.length==0){
    		$state.go('home');
    	};
    };
    $scope.isRefresh();

    

    $scope.toggleModal = function(btnClicked){
        $scope.buttonClicked = btnClicked;
        $scope.showModal = !$scope.showModal;
    };
 	$scope.players = [];
	$scope.categories = [];
	$scope.tips = [];
	$scope.riddless =[];
	$scope.expln=[];
	$scope.countOne=0;
	$scope.countTwo=0;


	$http.get("/riddles").then(function (response) {
        $scope.riddles = response.data; //See ? this variable is no longer set as result of the $http return !
        $scope.riddlesCount = $scope.riddles.length;

		$scope.players[0].text = $scope.getRandomRiddle();
		$scope.players[1].text = $scope.getRandomRiddle();
		$scope.convertTextToTab($scope.players[0].text,$scope.players[0].riddleText);
		$scope.makeTextHide($scope.players[0].riddleText,$scope.players[0].hiddenRiddleText);
		$scope.convertTextToTab($scope.players[1].text,$scope.players[1].riddleText);
		$scope.makeTextHide($scope.players[1].riddleText,$scope.players[1].hiddenRiddleText);
        return response.data;
    });

    $scope.newGame = function(){

		$scope.riddless = [];
		$scope.categories = [];
		$scope.tips = [];
		$scope.expln = [];
    	$scope.players=[{name:$scope.playersName[0], text:$scope.getRandomRiddle(), isWin:0,isLose:0,chances:9,riddleText:[],hiddenRiddleText:[],photo:hangmenPhotos[0],photonr:0},
					{name:$scope.playersName[1], text:$scope.getRandomRiddle(), isWin:0,isLose:0,chances:9,riddleText:[],hiddenRiddleText:[],photo:hangmenPhotos[0],photonr:0}
					];
		$scope.convertTextToTab($scope.players[0].text,$scope.players[0].riddleText);
		$scope.makeTextHide($scope.players[0].riddleText,$scope.players[0].hiddenRiddleText);
		$scope.convertTextToTab($scope.players[1].text,$scope.players[1].riddleText);
		$scope.makeTextHide($scope.players[1].riddleText,$scope.players[1].hiddenRiddleText);
		$scope.clickedLettersOne = [];
		$scope.clickedLettersTwo = [];
    }
	$scope.playerOne=true;
	$scope.playerTwo=false;
	$scope.winPlayer="";
	$scope.winRiddle=[];

	$scope.getRandomRiddle = function(){
		$scope.randomNumber = Math.floor(Math.random() * $scope.riddlesCount-1) + 1  ;
		$scope.riddleOut = $scope.riddles[$scope.randomNumber].text;
		$scope.riddless.push($scope.riddles[$scope.randomNumber].text);
		$scope.categories.push($scope.riddles[$scope.randomNumber].category);
		$scope.tips.push($scope.riddles[$scope.randomNumber].tip);
		$scope.expln.push($scope.riddles[$scope.randomNumber].explenation);
		return $scope.riddleOut;
	}
	
	
	var hangmenPhotos = ["images/1.png","images/2.png","images/3.png","images/4.png","images/5.png","images/6.png","images/7.png","images/8.png","images/9.png","images/10.png"];

	$scope.players=[{name:$scope.playersName[0], text:"", isWin:0,isLose:0,chances:9,riddleText:[],hiddenRiddleText:[],photo:hangmenPhotos[0],photonr:0},
					{name:$scope.playersName[1], text:"", isWin:0,isLose:0,chances:9,riddleText:[],hiddenRiddleText:[],photo:hangmenPhotos[0],photonr:0}
					];
	$scope.currentPlayer = $scope.players[0].name;

	

	$scope.letterTab = [{row:1, letters:['Q','W','E','R','T','Y','U','I','O','P']},
					  {row:2, letters: ['A','S','D','F','G','H','J','K','L']},
					  {row:3, letters: ['Z','X', 'C','V', 'B','N','M']}

	];
	$scope.clickedLettersOne = [];
	$scope.clickedLettersTwo = [];

	$scope.checkLetters = function (x){
		if($scope.playerOne==true){
			if($scope.clickedLettersOne.indexOf(x)>=0){
				return true;
			}
		}else if($scope.playerTwo==true){
			if($scope.clickedLettersTwo.indexOf(x)>=0){
				return true;
			}
		}
	}

	$scope.postData = function(txt,cat,ti,exp){
		console.log(txt);
		data = { text: txt ,category: cat, tip: ti, explenation: exp}
		
		$http.post("/riddles", data).success(function(data2,status) {
		});
	}

	$scope.letterClicked = function(lineIndex, letterIndex){

		var tempplayer = [];
		var tempIndex = 0;
		var actuallyRiddleText =[];

		if($scope.playerOne==true){
			tempplayer=$scope.players[0];
			$scope.clickedLettersOne.push($scope.letterTab[lineIndex].letters[letterIndex]);

		}else if($scope.playerTwo==true){
			tempplayer=$scope.players[1];
			$scope.clickedLettersTwo.push($scope.letterTab[lineIndex].letters[letterIndex]);
		}

		for(var i=0;i<=tempplayer.riddleText.length-1;i++){
			if($scope.letterTab[lineIndex].letters[letterIndex] == tempplayer.riddleText[i]){
				actuallyRiddleText=tempplayer.hiddenRiddleText;
				tempIndex=i;
				tempplayer.isWin++;
				tempIndex=0;
				tempplayer.hiddenRiddleText[i]=$scope.letterTab[lineIndex].letters[letterIndex];
				if(tempplayer.hiddenRiddleText.length-1==tempplayer.isWin && tempplayer.hiddenRiddleText.indexOf('|')>=0){
					$scope.winPlayer="Gracz " + tempplayer.name + " zdobywa punkt";
					if($scope.playerOne==true){
						$scope.countOne++;
					}else if($scope.playerTwo==true){
						$scope.countTwo++;
					}
					$scope.showModal = !$scope.showModal;
					
				}
				else if(tempplayer.hiddenRiddleText.length==tempplayer.isWin ){
					$scope.winPlayer="Gracz " + tempplayer.name + " zdobywa punkt";
					if($scope.playerOne==true){
						$scope.countOne++;
					}else if($scope.playerTwo==true){
						$scope.countTwo++;
					}
					$scope.showModal = !$scope.showModal;
				}
				
			}
		}
		

		if(actuallyRiddleText!=tempplayer.hiddenRiddleText){
			tempplayer.chances--;
			if($scope.playerOne==true){

				$scope.players[0]=tempplayer;
				$scope.playerOne=false;
				$scope.playerTwo=true;
				$scope.currentPlayer=$scope.players[1].name;
				$scope.players[0].photonr++;
				$scope.players[0].photo=hangmenPhotos[$scope.players[0].photonr];
			}else if($scope.playerTwo==true){
				$scope.players[1]=tempplayer;
				$scope.playerOne=true;
				$scope.playerTwo=false;
				$scope.currentPlayer=$scope.players[0].name;
				$scope.players[1].photonr++;
				$scope.players[1].photo=hangmenPhotos[$scope.players[1].photonr];
			}
		}
		if(tempplayer.chances==tempplayer.isLose){
			$scope.winPlayer="Gracz " + tempplayer.name + " stracił szansy, punkt dla przeciwnika";
				if($scope.playerOne==true){
					$scope.countOne++;
				}else if($scope.playerTwo==true){
					$scope.countTwo++;
				}
			$scope.showModal = !$scope.showModal;
		}
	
	};

	$scope.convertTextToTab = function(text,riddleText){
		for(var i=0;i<=text.length-1;i++){
			riddleText.push(text[i].toUpperCase());
		}
	};

	$scope.makeTextHide = function(riddleText,hiddenRiddleText){
		for(var i=0;i<=riddleText.length-1;i++){	
			if(riddleText[i]==" "){
				hiddenRiddleText.push('|');
			}
			else{
				hiddenRiddleText.push('_');
			}		
			
		}

	}

	


}]).directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" ng-click="newGame()" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ winPlayer }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 

            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
          scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });;