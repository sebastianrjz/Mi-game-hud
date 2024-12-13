import './preguntas.css'

// src/functions/domElements.js

export const createGameElements = () => {
  // Crear elementos HTML dinámicamente
  const divContent = document.querySelector('.content') // El contenedor principal de la página
  divContent.innerHTML = '' // Limpiar cualquier contenido anterior

  // Crear un contenedor adicional con la clase 'content50'
  const content50 = document.createElement('div')
  content50.classList.add('content50') // Agregar la clase content50
  divContent.appendChild(content50) // Añadirlo dentro de divContent

  // Crear y configurar el contenedor de la pregunta
  const questionElement = document.createElement('div')
  questionElement.classList.add('question')
  content50.appendChild(questionElement)

  // Crear el contenedor de las opciones
  const optionsElement = document.createElement('ul')
  optionsElement.classList.add('options')
  content50.appendChild(optionsElement)

  // Crear el botón para siguiente pregunta
  const nextButton = document.createElement('button')
  nextButton.classList.add('btn')
  nextButton.textContent = 'Siguiente'
  nextButton.setAttribute('disabled', 'true')
  content50.appendChild(nextButton)

  // Crear el área para mostrar el resultado
  const resultElement = document.createElement('div')
  resultElement.setAttribute('id', 'result')
  resultElement.style.display = 'none'
  content50.appendChild(resultElement)

  // Crear el botón de reinicio (inicialmente no visible)
  const restartButton = document.createElement('button')
  restartButton.classList.add('btn')
  restartButton.textContent = 'Reiniciar'
  restartButton.style.display = 'none' // Ocultamos el botón inicialmente
  content50.appendChild(restartButton)

  return {
    divContent,
    content50,
    questionElement,
    optionsElement,
    nextButton,
    resultElement,
    restartButton
  }
}
