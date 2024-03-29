const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const points = document.getElementById("points")

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: "Which of the following is used in Pencils?",
    answers: [
      { text: 'Silicon', correct: false },
      { text: 'Phosphorous', correct: false },
      { text: 'Charcoal', correct: false },
      { text: 'Graphite', correct: true },
    ]
  },
  {
    question: 'What is the name of the phenomenon that occurs when a star collapses under its own gravity, becoming extremely dense?',
    answers: [
      { text: 'Black Hole', correct: true },
      { text: 'Pulsar', correct: false },
      { text: 'Nebula', correct: false },
      { text: 'Supernova', correct: false }
    ]
  },
  {
    question: "Which is the hardest substance available on Earth?",
    answers: [
      { text: 'Gold', correct: false },
      { text: 'Diamond', correct: true },
      { text: 'Iron', correct: false },
      { text: 'Platinum', correct: false }
    ]
  },
  {
    question: 'What is the average salinity of sea water?',
    answers: [
      { text: "3%", correct: false },
      { text: "4.5%", correct: false },
      { text: "3.5%", correct: true },
      { text: "60%", correct: false }
    ]
  },
  {
    question: "What is laughing gas?",
    answers: [
      { text: "Sulphuric acid", correct: false },
      { text: "Nitrous dioxide", correct: false },
      { text: "Nitrous oxide", correct: true },
      { text: "Hydrogen peroxide", correct: false }
    ]
  }, 
  {
    question: "What is the largest moon in our solar system?",
    answers: [
      { text: "Titan", correct: false },
      { text: "Phobos", correct: false },
      { text: "Europa", correct: false },
      { text: "Ganymede", correct: true },
    ]
  }
]