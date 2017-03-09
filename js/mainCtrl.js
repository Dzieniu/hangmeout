angular.module('hangmeoutApp').controller('mainCtrl', [
'$scope',

function($scope){

	var playerOne=true;
	var playerTwo=false;
	var playerOneHitLetters = [];
	var playerTwoHitLetters = [];
	
	var hangmenPhotos = ["../images/1.png","../images/2.png","../images/3.png","../images/4.png","../images/5.png","../images/6.png"];

	$scope.players=[{name:"Konrad", text:"czesc", isWin:0,isLose:1,chances:5,riddleText:[],hiddenRiddleText:[],photo:hangmenPhotos[0],photonr:0},
					{name:"Kicia", text:"hej", isWin:0,isLose:1,chances:5,riddleText:[],hiddenRiddleText:[],photo:hangmenPhotos[0],photonr:0}
					];
	$scope.currentPlayer = $scope.players[0].name;

	

	$scope.letterTab = [{row:1, letters:['Q','W','E','R','T','Y','U','I','O','P']},
					  {row:2, letters: ['A','S','D','F','G','H','J','K','L']},
					  {row:3, letters: ['Z','X', 'C','V', 'B','N','M']}

	];

	$scope.letterClicked = function(lineIndex, letterIndex){

		var tempplayer = [];
		var tempIndex = 0;
		var actuallyRiddleText =[];

		if(playerOne==true){
			tempplayer=$scope.players[0];
			
		}else if(playerTwo==true){
			tempplayer=$scope.players[1];
		}

		for(var i=0;i<=tempplayer.riddleText.length-1;i++){
			if($scope.letterTab[lineIndex].letters[letterIndex] == tempplayer.riddleText[i]){
				actuallyRiddleText=tempplayer.hiddenRiddleText;
				tempIndex=i;
				tempplayer.isWin++;
				tempIndex=0;
				tempplayer.hiddenRiddleText[i]=$scope.letterTab[lineIndex].letters[letterIndex];
				if(tempplayer.hiddenRiddleText.length==tempplayer.isWin){
					setTimeout(function(){ alert("Wygrales gracz " + tempplayer.name); }, 20);
				}
				
			}
		}
		if(tempplayer.chances==tempplayer.isLose){
			setTimeout(function(){ alert("Przegral gracz " + tempplayer.name); }, 20);
		}

		if(actuallyRiddleText!=tempplayer.hiddenRiddleText){
			tempplayer.chances--;
			if(playerOne==true){

				$scope.players[0]=tempplayer;
				playerOne=false;
				playerTwo=true;
				$scope.currentPlayer=$scope.players[1].name;
				$scope.players[0].photonr++;
				$scope.players[0].photo=hangmenPhotos[$scope.players[0].photonr];
			}else if(playerTwo==true){
				$scope.players[1]=tempplayer;
				playerOne=true;
				playerTwo=false;
				$scope.currentPlayer=$scope.players[0].name;
				$scope.players[1].photonr++;
				$scope.players[1].photo=hangmenPhotos[$scope.players[1].photonr];
			}
		}
			};

	convertTextToTab = function(text,riddleText){
		for(var i=0;i<=text.length-1;i++){
			riddleText.push(text[i].toUpperCase());
		}
	};

	makeTextHide = function(riddleText,hiddenRiddleText){
		for(var i=0;i<=riddleText.length-1;i++){			
			hiddenRiddleText.push('_');
		}

	}

	convertTextToTab($scope.players[0].text,$scope.players[0].riddleText);
	makeTextHide($scope.players[0].riddleText,$scope.players[0].hiddenRiddleText);
	convertTextToTab($scope.players[1].text,$scope.players[1].riddleText);
	makeTextHide($scope.players[1].riddleText,$scope.players[1].hiddenRiddleText);


}]);