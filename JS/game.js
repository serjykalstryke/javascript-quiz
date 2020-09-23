//DOM ELEMENTS- CONNECTS JAVASCRIPT TO HTML//

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const timerEl = document.querySelector('.time')

//global variables that are called in later functions//
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4
var timeLeft = 60

//Start game function//
function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    setTime();
}

//Generates next question from question array, as well as changes the progress bar to show how many questions are left//
function getNewQuestion() {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score + timeLeft);

        return window.location.assign('end.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(function(choice) {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestions.splice(questionsIndex, 1);
    acceptingAnswers = true;
}
//function to increment the score//
function incrementScore(num) {
    score += num
    scoreText.innerText = score
}

//Questions array//
let questions = [
    {
        question: 'Who invented JavaScript?',
        choice1: 'Steve Jobs',
        choice2: 'Douglas Crockford',
        choice3: 'Brian Eich',
        choice4: 'Sheryl Sandberg',
        answer: 2
    },
    {
        question: 'Which tool can you use to ensure code quality?',
        choice1: 'ESLint',
        choice2: 'Angular',
        choice3: 'jQuery',
        choice4: 'Node.JS',
        answer: 1
    },
    {
        question: 'Which one of these is a JavaScript package manager?',
        choice1: 'nps',
        choice2: 'rpm',
        choice3: 'npm',
        choice4: 'Node.js',
        answer: 3
    },
    {
        question: 'Inside of what HTML Tag would you put Javascript code?',
        choice1: '<script>',
        choice2: '<a>',
        choice3: '<src>',
        choice4: '<style>',
        answer: 1
    },
]

//timer function//
function setTime() {
setInterval(function() {
    timerEl.textContent = timeLeft;
    timeLeft--;

    if (timeLeft <= 0) {
      timerEl.textContent = "";
      return window.location.assign('gameover.html');
    }

  }, 1000);
}

//function for selecting an answer, it waits for a click and then shows whether the answer was correct or not. correct answers call function to increment the score by constant SCORE_POINTs which is set above to 100 points//
choices.forEach(function(choice) {
    choice.addEventListener('click', function(e) {
        if (!acceptingAnswers) return
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
            timeLeft += 10
        } 

        if (classToApply != 'correct') {
            timeLeft -= 20;
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(function() {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
})
})
//calls function start game to allow quiz to start//
startGame()