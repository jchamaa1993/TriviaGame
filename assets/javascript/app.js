var gameQuestions = [
	//Question 1 
	question1 = {
		question: '<p class="text-center">Who led the league in blocks in the 2015-2016 NBA season?</p>',
		correctAnswer: 'Hassan Whiteside',
		incorrectPossiblities: ['Rudy Gobert', 'Deandre Jordan', 'Anthony Davis'],
		gif: '<img src="assets/images/hassanWhiteside.gif">'
	},
	question2 = {
		question: '<p class="text-center">Who led the league in Turnovers in the 2015-2016 NBA season?</p>',
		correctAnswer: 'James Harden',
		incorrectPossiblities: ['Ricky Rubio', 'Stephen Curry', 'John Wall'],
		gif: '<img src="assets/images/jamesHarden.gif">'
	},
	question3 = {
		question: '<p class="text-center">Who led the league in rebounds in the 2015-2016 NBA season?</p>',
		correctAnswer:'Andre Drummond',
		incorrectPossiblities: ['Deandre Jordan','Anthony Davis','KAT'],
		gif: '<img src="assets/images/andreDrummond.gif">'
	},
	question4 = {
		question: '<p class="text-center">Who led the league in points in the 2015-2016 NBA season?</p>',
		correctAnswer:'Stephen Curry',
		incorrectPossiblities: ['Kevin Durant','James Harden','LeBron James'],
		gif: '<img src="assets/images/stephenCurry.gif">'
	},
	question5 = {
		question: '<p class="text-center">Who led the league in FG% in the 2015-2016 NBA season?</p>',
		correctAnswer:'Deandre Jordan',
		incorrectPossiblities: ['KAT','Dwight Howard','Hassan Whiteside'],
		gif: '<img src="assets/images/deandreJordan.gif">'
	},
	question6 = {
		question: '<p class="text-center">Who led the league in technical fouls in the 2015-2016 NBA season?</p>',
		correctAnswer:'DeMarcus Cousins',
		incorrectPossiblities: ['Draymond Green','Isaiah Thomas','Dwight Howard'],
		gif: '<img src="assets/images/demarcusCousins.gif">'
	},
	question7 = {
		question: '<p class="text-center">Which player had the most points scored in a single game in 2016-2016 season?</p>',
		correctAnswer:'Kobe Bryant',
		incorrectPossiblities: ['Stephen Curry','Anthony Davis','James Harden'],
		gif: '<img src="assets/images/kobeBryant.gif">'
	},
	question8 = {
		question: '<p class="text-center">Who led the league in triple doubles in the 2015-2016 NBA season?</p>',
		correctAnswer:'Russell Westbrook',
		incorrectPossiblities: ['Draymond Green','Kevin Durant','Hassan Whiteside'],
		gif: '<img src="assets/images/russellWestbrook.gif">'
	},
	question9 = {
		question: '<p class="text-center">Which two teams never changed cities?</p>',
		correctAnswer:'Knicks and Celtics',
		incorrectPossiblities: ['Knicks and Lakers','Clippers and Rockets','Trailblazers and Bulls'],
		gif: '<img src="assets/images/knicks.gif">'
	},
	question10 = {
		question: '<p class="text-center">Which of the following was drafted first overall in their draft?</p>',
		correctAnswer:'Bill Walton',
		incorrectPossiblities: ['Michael Jordan','Kareem Abdul-Jabbar','Karl Malone'],
		gif: '<img src="assets/images/billWalton.gif">'
	},
]
var gameStatistics = {
	// Number of correct answers.
	correctAnswerCounter : 0,
	// Total questions.
	totalQuestionCounter: gameQuestions.length,
	// Timer.
	timer: 15,
	// Current question number.
	questionNumber: 0,
	// Unanswered questions.
	unansweredCounter: 0,
	// incorrect answers.
	incorrectAnswerCounter: 0,
}

var resettableCounter;
// Randomize the order of the potential answers.
$.fn.randomize = function(selector){
    var $elems = selector ? $(this).find(selector) : $(this).children(),
        $parents = $elems.parent();

    $parents.each(function(){
        $(this).children(selector).sort(function(){
            return Math.round(Math.random()) - 0.5;
        // }). remove().appendTo(this); // 2014-05-24: Removed `random` but leaving for reference. See notes under 'ANOTHER EDIT'
        }).detach().appendTo(this);
    });

    return this;
};
// Displays if you run out of time.
function outOfTime() {
	$('#display').html('<p class = "text-center" id = "timeOut">Out of time!</p>');
	$('#display').append('<p class="text-center">The correct answer was: ' + gameQuestions[gameStatistics.questionNumber].correctAnswer);
	displayGif(gameStatistics.questionNumber)
	gameStatistics.unansweredCounter++;
};
// Displays the time. Is run every second.
function countDown() {
	gameStatistics.timer--;
	$('#timerDiv').html('<h3 id="timer" class="text-center"> Time remaining: </span>' + gameStatistics.timer + '<br />');
	if(gameStatistics.timer === 0)
		outOfTime();

}
// Displays the question and answers.
function displayQuestion(index) {
	// Reset timer for any new question.

	gameStatistics.timer = 15;
	$('#display').html(gameQuestions[index].question);
	var list = $('<ul></ul>');
	for (var j = 0; j<3; j++)
		list.append('<li class ="incorrect text-center">' + gameQuestions[index].incorrectPossiblities[j]+ '</li>');
	list.append('<li id = "answer" class ="text-center">' + gameQuestions[index].correctAnswer + '</li>');
	list = $(list).randomize();
	$("#display").append(list);
	$('#timerDiv').html('<h3 class="text-center" id="timer"> Time remaining: </span>' + gameStatistics.timer + '<br />');
	resettableCounter = setInterval(countDown,1000);
	$('#answer').click(function() {
		rightAnswer(index);
		displayGif(index);
	});
	$('.incorrect').click(function() {
		console.log('hey');
		wrongAnswer(index);
		displayGif(index);
	});

};
// Right answer function is run when the right answer is clicked.
function rightAnswer(index) {
	$('#display').html('<p class="text-center">Correct!</p>');
	gameStatistics.correctAnswerCounter++;
};
//Wrong answer function when wrong answer is clicked.
function wrongAnswer(index) {
	$('#display').html('<p class="text-center">Wrong!</p>');
	$('#display').append('<p class="text-center">The correct answer was: ' + gameQuestions[gameStatistics.questionNumber].correctAnswer);
	gameStatistics.incorrectAnswerCounter++;
}
// Display the gif for the answer.
function displayGif(index) {
	clearInterval(resettableCounter);
	$('#display').append(gameQuestions[index].gif);
	// Now on the next question.
	gameStatistics.questionNumber++;
	// If there is another question display it after 3 seconds. If not, display the score.
	if(gameStatistics.questionNumber<gameStatistics.totalQuestionCounter) {
		setTimeout(function() {
			displayQuestion(gameStatistics.questionNumber);
		},3000);
	} else {
		setTimeout(finalDisplay,3000);
	}
}
// Display score and give option for restart of game.
function finalDisplay() {
	$('#display').html("<h2 class='text-center'>Let's see how you did!</h2>")
	$('#display').append('<p class="text-center">Correct Answers: ' + gameStatistics.correctAnswerCounter + '</p>'
		+ '<p class="text-center">Inorrect Answers: ' + (gameStatistics.incorrectAnswerCounter) + '</p>'
		+ '<p class="text-center">Unanswered: ' + gameStatistics.unansweredCounter + '</p>'
		+ '<button class="btn-primary btn-lg center-block" id="restartButton">Restart Game</button>');

	$('#restartButton').click(function() {
		restartPage();
	})
}

function restartPage() {
	gameStatistics.questionNumber = 0;
	gameStatistics.correctAnswerCounter = 0;
	gameStatistics.incorrectAnswerCounter = 0;
	gameStatistics.unansweredCounter = 0;
	$('#timerDiv').empty();
	$('#display').html("<button class = 'btn-primary btn-lg center-block' id = 'startButton'>Start</button>");
	$('#startButton').click(function() {
		displayQuestion(gameStatistics.questionNumber)
	});
}

$('#startButton').click(function() {
	displayQuestion(gameStatistics.questionNumber)
});


