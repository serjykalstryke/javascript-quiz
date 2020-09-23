//DOM Elements//

const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

//gets value of score from local storage, if no scores present sets highscores var to empty array//
const highScores = JSON.parse(localStorage.getItem('highScores')) || [] 

//sets final score variable equal to local storage element mostRecentScore
finalScore.innerText = mostRecentScore

//dissalows saving a high score without name input//
username.addEventListener('keyup', function() {
    saveScoreBtn.disabled = !username.value
})

//save high score function, takes in click event and saves high score//
var saveHighScore = function(e) {
    event.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort(function(a,b) {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('../index.html')
}