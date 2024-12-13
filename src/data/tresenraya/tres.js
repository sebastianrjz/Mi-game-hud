// juego.js

import { crearTablero } from '../../components/tresenraya/tres'

export const inittres = () => {
  // Obtener los elementos creados por la función de creación de la interfaz
  const { gameContainer, board, status, message, resetButton, scoreBoard } =
    crearTablero()

  // Recuperar la puntuación desde el localStorage
  let xWins = parseInt(localStorage.getItem('xWins')) || 0
  let oWins = parseInt(localStorage.getItem('oWins')) || 0
  let draws = parseInt(localStorage.getItem('draws')) || 0

  // Función para actualizar la puntuación en la UI
  function updateScore() {
    scoreBoard.textContent = `X: ${xWins} | O: ${oWins} | Empates: ${draws}`
  }
  updateScore()

  // Estado del tablero y configuración inicial
  let boardState = ['', '', '', '', '', '', '', '', '']
  let currentPlayer = 'X'
  let gameActive = true

  // Crear las celdas del tablero
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    cell.setAttribute('data-index', i)
    board.appendChild(cell)

    // Agregar evento de clic a cada celda
    cell.addEventListener('click', handleCellClick)
  }

  // Manejar el clic en una celda
  function handleCellClick(event) {
    const index = event.target.getAttribute('data-index')
    if (boardState[index] !== '' || !gameActive) return

    boardState[index] = currentPlayer
    event.target.textContent = currentPlayer
    event.target.classList.add(currentPlayer.toLowerCase())

    // Verificar si hay un ganador
    if (checkWinner()) {
      message.textContent = `${currentPlayer} ha ganado!`
      gameActive = false
      if (currentPlayer === 'X') {
        xWins++
        localStorage.setItem('xWins', xWins)
      } else {
        oWins++
        localStorage.setItem('oWins', oWins)
      }
      updateScore()
    } else if (boardState.every((cell) => cell !== '')) {
      // Si no hay ganador y el tablero está lleno, es empate
      message.textContent = '¡Empate!'
      gameActive = false
      draws++
      localStorage.setItem('draws', draws)
      updateScore()
    } else {
      // Cambiar de jugador
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
      message.textContent = `Turno de ${currentPlayer}`
    }
  }

  // Función para verificar si hay un ganador
  function checkWinner() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    return winPatterns.some((pattern) => {
      const [a, b, c] = pattern
      return (
        boardState[a] !== '' &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      )
    })
  }

  // Función para reiniciar el juego
  resetButton.addEventListener('click', resetGame)

  function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', '']
    currentPlayer = 'X'
    gameActive = true
    message.textContent = `Turno de ${currentPlayer}`

    const cells = document.querySelectorAll('.cell')
    cells.forEach((cell) => {
      cell.textContent = ''
      cell.classList.remove('x', 'o')
    })
  }
}
