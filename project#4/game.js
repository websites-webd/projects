const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
let questions = [
    {
        question: 'Which team secured the top position in the ICC test rankings with 123 points in May 2017?',
        choice1: 'South Africa',
        choice2: 'India',
        choice3: 'West Indies',
        choice4: 'Australia ',
        answer: 2
    },
    {
        question: 'ICC has appointed whom as the official ambassador of the Womens Cricket World Cup 2017?',
        choice1: 'Rahul Dravid',
        choice2: 'Anil Kumble',
        choice3: 'Sachin Tendulkar',
        choice4: 'Sourav Ganguly',
        answer: 3
    },
    {
        question: 'Which bowler became the fastest to take 250 wickets in Test matches?',
        choice1: 'Brett Lee',
        choice2: 'Anil Kumble ',
        choice3: 'Ravichandran Ashwin',
        choice4: 'Wasim Akram',
        answer: 3
    },
    {
        question: 'Who is known as the female Don Bradman in the cricketing world?',
        choice2: 'Elyse Perry',
        choice1: 'Betty Wilson',
        choice3: 'Mithali Raj',
        choice4: 'Smriti Mandhana ',
        answer: 1
     },
     {
        question: 'Which India cricketer was named on Cricket Australias ODI team of the year on 27 Dec 2016?',
        choice1: 'Jasprit Bumrah',
        choice2: 'Rohit Sharma',
        choice4: 'Virat Kohli',
        choice3: 'MS Dhoni',
        answer: 4
    },
    {
        question: 'Which country won the UEFA European Football Championship in 2008 by beating Germany in the finals?',
        choice1: 'Russia',
        choice2: 'Spain',
        choice3: 'Italy',
        choice4: 'England',
        answer: 2
     },
     {
        question: 'Who was the Champions league winner in 2011?',
        choice2: 'Manchester United',
        choice3: 'Barcelona',
        choice1: 'Bayern FC',
        choice4: 'Real Madrid',
        answer: 3
     },
     {
        question: 'Who was the Champions league winner in 2005?',
        choice2: 'Real Madrid',
        choice1: 'LiverPool',
        choice3: 'Juventus',
        choice4: 'Manchester United',
        answer: 1
     }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 8

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()