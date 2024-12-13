import './tres.css'
// crearTablero.js

export function crearTablero() {
  const divContent = document.querySelector('.content')
  divContent.innerHTML = '' // Limpiar el contenido existente

  // Crear contenedor principal
  const gameContainer = document.createElement('div')
  gameContainer.classList.add('game-container')

  // Crear el tablero
  const board = document.createElement('div')
  board.classList.add('board')
  gameContainer.appendChild(board)

  // Crear el mensaje de estado
  const status = document.createElement('div')
  status.classList.add('status')

  // Mensaje de turno
  const message = document.createElement('p')
  message.setAttribute('id', 'message')
  message.textContent = 'Turno de X'
  status.appendChild(message)

  // Botón de reinicio
  const resetButton = document.createElement('button')
  resetButton.setAttribute('id', 'reset')
  resetButton.textContent = 'Reiniciar Juego'
  status.appendChild(resetButton)

  // Mostrar la puntuación
  const scoreBoard = document.createElement('p')
  scoreBoard.setAttribute('id', 'score')
  gameContainer.appendChild(scoreBoard)

  // Añadir todo al contenedor principal
  gameContainer.appendChild(status)
  divContent.appendChild(gameContainer)

  // Devolver el contenedor para que pueda ser usado en otro archivo
  return { gameContainer, board, status, message, resetButton, scoreBoard }
}
