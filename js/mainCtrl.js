angular.module('hangmeoutApp').controller('mainCtrl', [
'$scope',

function($scope){
	$scope.text = "KochamCie";

	var riddleText = [];
	$scope.hiddenRiddleText = [];
	var isWin=0;
	var isLose =0;
	$scope.chances = 5;

	$scope.letterTab = [{row:1, letters:['Q','W','E','R','T','Y','U','I','O','P']},
					  {row:2, letters: ['A','S','D','F','G','H','J','K','L']},
					  {row:3, letters: ['Z','X', 'C','V', 'B','N','M']}

	];

	$scope.letterClicked = function(lineIndex, letterIndex){
		var tempIndex = 0;
		var actuallyRiddleText =[];
		
		
		for(var i=0;i<=riddleText.length-1;i++){
			if($scope.letterTab[lineIndex].letters[letterIndex] == riddleText[i]){
				actuallyRiddleText=$scope.hiddenRiddleText;
				tempIndex=i;
				isWin++;
				tempIndex=0;
				$scope.hiddenRiddleText[i]=$scope.letterTab[lineIndex].letters[letterIndex];
				if($scope.hiddenRiddleText.length==isWin){
					setTimeout(function(){ alert("Wygrales :)"); }, 20);
				}
				
			}
		}
		if(actuallyRiddleText!=$scope.hiddenRiddleText){
			$scope.chances--;
		}
		if($scope.chances==isLose){
			setTimeout(function(){ alert("Przegrales :("); }, 20);
		}
	};

	$scope.convertTextToTab = function(){
		for(var i=0;i<=$scope.text.length-1;i++){
			riddleText.push($scope.text[i].toUpperCase());
		}
	};

	$scope.makeTextHide = function(){
		for(var i=0;i<=riddleText.length-1;i++){			
			$scope.hiddenRiddleText.push('_');
		}

	}

	$scope.convertTextToTab();
	$scope.makeTextHide();

}]);
