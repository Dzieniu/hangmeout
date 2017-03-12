angular.module('hangmeoutApp').controller('mainCtrl', [
'$scope','$http',

function($scope,$http){

	$scope.players = [];
	$scope.categories = [];
	$scope.tips = [];


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

		$scope.categories = [];
		$scope.tips = [];
    	$scope.players=[{name:"Konrad", text:$scope.getRandomRiddle(), isWin:0,isLose:1,chances:5,riddleText:[],hiddenRiddleText:[],photo:hangmenPhotos[0],photonr:0},
					{name:"Kicia", text:$scope.getRandomRiddle(), isWin:0,isLose:1,chances:5,riddleText:[],hiddenRiddleText:[],photo:hangmenPhotos[0],photonr:0}
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

	$scope.getRandomRiddle = function(){
		$scope.randomNumber = Math.floor(Math.random() * $scope.riddlesCount-1) + 1  ;
		$scope.riddleOut = $scope.riddles[$scope.randomNumber].text;
		$scope.categories.push($scope.riddles[$scope.randomNumber].category);
		$scope.tips.push($scope.riddles[$scope.randomNumber].tip);
		return $scope.riddleOut;
	}
	
	
	var hangmenPhotos = ["images/1.png","images/2.png","images/3.png","images/4.png","images/5.png","images/6.png"];

	$scope.players=[{name:"Konrad", text:"", isWin:0,isLose:1,chances:5,riddleText:[],hiddenRiddleText:[],photo:hangmenPhotos[0],photonr:0},
					{name:"Kicia", text:"", isWin:0,isLose:1,chances:5,riddleText:[],hiddenRiddleText:[],photo:hangmenPhotos[0],photonr:0}
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

	$scope.postData = function(txt,cat,ti){
		console.log(txt);
		data = { text: txt ,category: cat, tip: ti}
		
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
					setTimeout(function(){ alert("Wygrales gracz " + tempplayer.name); }, 20);
					$scope.newGame();
				}
				else if(tempplayer.hiddenRiddleText.length==tempplayer.isWin ){
					setTimeout(function(){ alert("Wygrales gracz " + tempplayer.name); }, 20);
					$scope.newGame();
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
			setTimeout(function(){ alert("Przegral gracz " + tempplayer.name); }, 20);
			$scope.newGame();
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

	


}]);