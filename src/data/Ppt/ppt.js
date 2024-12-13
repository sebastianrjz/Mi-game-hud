import { crearJuego } from '../../components/Ppt/Ppt'

let opcionJugador
let opcionPc
let imgJugador
let imgPc

export const initPpt = () => {
  const divContent = document.querySelector('.content')
  divContent.innerHTML = ''

  divContent.appendChild(crearJuego())

  // Acceder a los botones después de ser creados
  const btnPiedra = document.getElementById('btn-piedra')
  const btnPapel = document.getElementById('btn-papel')
  const btnTijeras = document.getElementById('btn-tijeras')
  const msjBatalla = document.getElementById('msj-batalla')
  const imgAtaqueJugador = document.getElementById('img-ataque-jugador')
  const imgAtaquePc = document.getElementById('img-ataque-pc')
  const seccionBatalla = document.createElement('div') // Contenedor para mostrar el resultado de la batalla
  divContent.appendChild(seccionBatalla)

  // Inicializar las imágenes
  const imagenes = [
    { name: 'Piedra', url: 'assets/Ppt/Piedra.PNG' },
    { name: 'Papel', url: 'assets/Ppt/Papel.PNG' },
    { name: 'Tijeras', url: 'assets/Ppt/Tijeras.PNG' }
  ]

  // Cargar el estado del juego desde localStorage
  let victorias = parseInt(localStorage.getItem('victorias')) || 0
  let derrotas = parseInt(localStorage.getItem('derrotas')) || 0
  let empates = parseInt(localStorage.getItem('empates')) || 0

  // Crear el div con los resultados
  const resultadosDiv = document.createElement('div')
  resultadosDiv.innerHTML = `
    <h3>Resultados:</h3>
    <p>Victorias: ${victorias}</p>
    <p>Derrotas: ${derrotas}</p>
    <p>Empates: ${empates}</p>
  `
  // Colocar el div de resultados debajo del mensaje de batalla
  msjBatalla.parentNode.insertBefore(resultadosDiv, msjBatalla.nextSibling)

  // Asignar los eventos a los botones
  btnPiedra.addEventListener('click', () => {
    opcionJugador = 'Piedra'
    opPc()
  })

  btnPapel.addEventListener('click', () => {
    opcionJugador = 'Papel'
    opPc()
  })

  btnTijeras.addEventListener('click', () => {
    opcionJugador = 'Tijeras'
    opPc()
  })

  // Generar la opción aleatoria de la PC
  function opPc() {
    const aleatorio = nAleatorio()

    // Corregir el error tipográfico
    if (aleatorio === 0) {
      opcionPc = 'Piedra'
    } else if (aleatorio === 1) {
      opcionPc = 'Papel'
    } else {
      opcionPc = 'Tijeras'
    }

    batalla()
  }

  // Calcular la batalla y determinar el ganador
  function batalla() {
    if (opcionJugador === opcionPc) {
      msjBatalla.innerHTML = 'Empate'
      empates++
    } else if (
      (opcionJugador === 'Piedra' && opcionPc === 'Tijeras') ||
      (opcionJugador === 'Papel' && opcionPc === 'Piedra') ||
      (opcionJugador === 'Tijeras' && opcionPc === 'Papel')
    ) {
      msjBatalla.innerHTML = '¡Ganaste!'
      victorias++
    } else {
      msjBatalla.innerHTML = 'Perdiste :('
      derrotas++
    }

    // Actualizar y guardar los resultados
    localStorage.setItem('victorias', victorias)
    localStorage.setItem('derrotas', derrotas)
    localStorage.setItem('empates', empates)

    addImagenes()
    actualizarResultados()
  }

  // Función para generar un número aleatorio para la PC
  function nAleatorio() {
    return Math.floor(Math.random() * 3) // Genera 0, 1 o 2
  }

  // Mostrar las imágenes según las elecciones
  function addImagenes() {
    imagenes.forEach((imagen) => {
      if (opcionJugador === imagen.name) {
        imgJugador = imagen.url
        imgAtaqueJugador.innerHTML = `<img class="img-batalla" src="${imgJugador}" alt="">`
      }

      if (opcionPc === imagen.name) {
        imgPc = imagen.url
        imgAtaquePc.innerHTML = `<img class="img-batalla" src="${imgPc}" alt="">`
      }
    })

    // Mostrar la sección de la batalla
    seccionBatalla.style.display = 'flex'
  }

  // Actualizar la visualización de los resultados
  function actualizarResultados() {
    resultadosDiv.innerHTML = `
      <h3>Resultados:</h3>
      <p>Victorias: ${victorias}</p>
      <p>Derrotas: ${derrotas}</p>
      <p>Empates: ${empates}</p>
    `
  }
}
