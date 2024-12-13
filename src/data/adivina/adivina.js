// src/functions/gameFunctions.js
import { createGameElements } from '../../components/adivina/preguntas'

export const initMole = () => {
  // Preguntas y respuestas
  const questions = [
    {
      question: '¿Quién pintó la Mona Lisa?',
      options: [
        'Pablo Picasso',
        'Vincent van Gogh',
        'Leonardo da Vinci',
        'Claude Monet'
      ],
      answer: 'Leonardo da Vinci'
    },
    {
      question: '¿Cuál es el río más largo del mundo?',
      options: ['Amazonas', 'Nilo', 'Yangtsé', 'Misisipi'],
      answer: 'Amazonas'
    },
    {
      question: '¿En qué año llegó el hombre a la Luna?',
      options: ['1965', '1969', '1971', '1959'],
      answer: '1969'
    },
    {
      question: '¿Cuál es el planeta más grande del sistema solar?',
      options: ['Júpiter', 'Saturno', 'Neptuno', 'Urano'],
      answer: 'Júpiter'
    }
  ]

  // Crear los elementos HTML
  const {
    divContent,
    content50,
    questionElement,
    optionsElement,
    nextButton,
    resultElement,
    restartButton
  } = createGameElements()

  let score = localStorage.getItem('score')
    ? parseInt(localStorage.getItem('score'))
    : 0
  let currentQuestionIndex = localStorage.getItem('currentQuestionIndex')
    ? parseInt(localStorage.getItem('currentQuestionIndex'))
    : 0

  if (currentQuestionIndex >= questions.length || currentQuestionIndex < 0) {
    currentQuestionIndex = 0
  }

  function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex]
    questionElement.textContent = currentQuestion.question
    optionsElement.innerHTML = ''

    currentQuestion.options.forEach((option) => {
      const li = document.createElement('li')
      li.textContent = option
      li.onclick = () => checkAnswer(option)
      optionsElement.appendChild(li)
    })
  }

  function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer

    if (selectedOption === correctAnswer) {
      score++
    }

    const options = document.querySelectorAll('.options li')
    options.forEach((option) => {
      option.onclick = null
      if (option.textContent === correctAnswer) {
        option.style.backgroundColor = 'green'
      } else if (option.textContent === selectedOption) {
        option.style.backgroundColor = 'red'
      }
    })

    nextButton.removeAttribute('disabled')
  }

  function nextQuestion() {
    currentQuestionIndex++

    if (currentQuestionIndex < questions.length) {
      loadQuestion()
      nextButton.setAttribute('disabled', 'true')
    } else {
      showResult()
    }

    localStorage.setItem('score', score)
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex)
  }

  function showResult() {
    resultElement.textContent = `¡Juego terminado! Tu puntuación es ${score} de ${questions.length}.`
    resultElement.style.display = 'block'
    nextButton.style.display = 'none'
    restartButton.style.display = 'inline-block'
    saveScore()
  }

  function saveScore() {
    localStorage.setItem('score', score)
  }

  function restartGame() {
    localStorage.removeItem('score')
    localStorage.removeItem('currentQuestionIndex')

    location.reload()
  }

  loadQuestion()

  nextButton.onclick = nextQuestion
  restartButton.onclick = restartGame
}
