//DOM ELEMENTS- CONNECTS JAVASCRIPT TO HTML//

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const timerEl = document.querySelector('.time')

//global variables that are called in alter functions//
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4
var timeLeft = 100

//Start game function//
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    setTime();
}

//Generates next question from question array, as well as changes the progress bar to show how many questions are left//
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('end.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    availableQuestions.splice(questionsIndex, 1);
    acceptingAnswers = true;
}

//function for selecting an answer, it waits for a click and then shows whether the answer was correct or not. correct answers call function to increment the score by constant SCORE_POINTs which is set above to 100 points//
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
})
})
//function to increment the score//
incrementScore = num => {
    score += num
    scoreText.innerText = score
}

//Questions array//
let questions = [
    {
        question: 'what is 2 + 2',
        choice1: '2',
        choice2: '4',
        choice3: '22',
        choice4: '17',
        answer: 2
    },
    {
        question: 'The tallest building in the world is located in which city?',
        choice1: 'Dubai',
        choice2: 'New York',
        choice3: 'Shanghai',
        choice4: 'None of the Above',
        answer: 1
    },
    {
        question: 'What percentage of American adults believe that chocolate milk comes from brown cows?',
        choice1: '20%',
        choice2: '18%',
        choice3: '7%',
        choice4: '33%',
        answer: 3
    },
    {
        question: 'Approximately what percent of U.S. power outgages are caused by squirrels?',
        choice1: '10-20%',
        choice2: '5-10%',
        choice3: '15-20%',
        choice4: '30-40%',
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
//calls function start game to allow quiz to start//
startGame()