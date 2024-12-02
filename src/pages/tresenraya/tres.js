import './tres.css'

// Exporta la función que inicializa el juego de Tres en Raya
export const inittres = () => {
  // Obtener el contenedor donde insertaremos el juego
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

  // Recuperar la puntuación desde el localStorage
  let xWins = parseInt(localStorage.getItem('xWins')) || 0
  let oWins = parseInt(localStorage.getItem('oWins')) || 0
  let draws = parseInt(localStorage.getItem('draws')) || 0

  // Actualizar la puntuación en la UI
  function updateScore() {
    scoreBoard.textContent = `X: ${xWins} | O: ${oWins} | Empates: ${draws}`
  }
  updateScore()

  // Lógica del juego
  let boardState = ['', '', '', '', '', '', '', '', ''] // Estado del tablero
  let currentPlayer = 'X' // Jugador actual
  let gameActive = true

  // Función para generar las celdas del tablero
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    cell.setAttribute('data-index', i)
    board.appendChild(cell)

    // Agregar evento de click a cada celda
    cell.addEventListener('click', handleCellClick)
  }

  // Función que maneja el clic en una celda
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
        localStorage.setItem('xWins', xWins) // Actualizar puntuación en localStorage
      } else {
        oWins++
        localStorage.setItem('oWins', oWins) // Actualizar puntuación en localStorage
      }
      updateScore() // Actualizar la puntuación mostrada
    } else if (boardState.every((cell) => cell !== '')) {
      // Si no hay ganador y el tablero está lleno, es un empate
      message.textContent = '¡Empate!'
      gameActive = false
      draws++
      localStorage.setItem('draws', draws) // Actualizar empates en localStorage
      updateScore() // Actualizar la puntuación mostrada
    } else {
      // Cambiar al siguiente jugador
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
