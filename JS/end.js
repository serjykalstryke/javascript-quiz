//DOM Elements//

const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

//gets value of score from local storage, if no scores present sets highscores var to empty array//
const highScores = JSON.parse(localStorage.getItem('highScores')) || [] 

//limits leaderboard to 5 most recent scores//
const MAX_HIGH_SCORES = 5

//sets final score variable equal to local storage element mostRecentScore
finalScore.innerText = mostRecentScore

//dissalows saving a high score without name input//
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

//save high score click event function
saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('../index.html')
}