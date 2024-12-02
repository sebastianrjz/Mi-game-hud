import './Ppt.css'
let opcionJugador
let opcionPc
let imgJugador
let imgPc

export const initPpt = () => {
  // Seleccionamos el contenedor donde se va a agregar el juego
  const divContent = document.querySelector('.content')

  divContent.innerHTML = '' // Limpiar cualquier contenido anterior

  // Función para crear el juego
  function crearJuego() {
    const body = document.createElement('div')
    body.className = 'contenedor1'

    // Crear el contenedor del campo de batalla
    const campoBatalla = document.createElement('div')
    campoBatalla.id = 'campo-batalla'
    campoBatalla.classList.add('campo-batalla')

    // Crear la caja de ataque del jugador
    const cajaJugador = document.createElement('div')
    cajaJugador.id = 'img-ataque-jugador'
    cajaJugador.classList.add('caja-batala')
    campoBatalla.appendChild(cajaJugador)

    // Crear la caja con el texto "VS"
    const vs = document.createElement('div')
    vs.classList.add('caja-batala')
    const vsText = document.createElement('p')
    vsText.classList.add('text-mensajes')
    vsText.textContent = 'VS'
    vs.appendChild(vsText)
    campoBatalla.appendChild(vs)

    // Crear la caja de ataque de la PC
    const cajaPC = document.createElement('div')
    cajaPC.id = 'img-ataque-pc'
    cajaPC.classList.add('caja-batala')
    campoBatalla.appendChild(cajaPC)

    // Añadir el campo de batalla al body
    body.appendChild(campoBatalla)

    // Crear el contenedor para el mensaje de la batalla
    const mensajeDiv = document.createElement('div')
    const mensajeP = document.createElement('p')
    mensajeP.id = 'msj-batalla'
    mensajeP.classList.add('text-mensajes')
    mensajeDiv.appendChild(mensajeP)
    body.appendChild(mensajeDiv)

    // Crear el título "Elije un ataque"
    const h2 = document.createElement('h2')
    h2.textContent = 'Elije un ataque'
    body.appendChild(h2)

    // Crear el contenedor de los botones de ataque
    const ataquesDiv = document.createElement('div')

    // Crear los botones de ataque
    const btnPiedra = document.createElement('img')
    btnPiedra.id = 'btn-piedra'
    btnPiedra.classList.add('btn-ataques')
    btnPiedra.src = 'assets/Ppt/Piedra.PNG'
    btnPiedra.alt = 'Piedra'

    const btnPapel = document.createElement('img')
    btnPapel.id = 'btn-papel'
    btnPapel.classList.add('btn-ataques')
    btnPapel.src = 'assets/Ppt/Papel.PNG'
    btnPapel.alt = 'Papel'

    const btnTijeras = document.createElement('img')
    btnTijeras.id = 'btn-tijeras'
    btnTijeras.classList.add('btn-ataques')
    btnTijeras.src = 'assets/Ppt/Tijeras.PNG'
    btnTijeras.alt = 'Tijeras'

    // Agregar los botones de ataque al contenedor
    ataquesDiv.appendChild(btnPiedra)
    ataquesDiv.appendChild(btnPapel)
    ataquesDiv.appendChild(btnTijeras)

    // Añadir el contenedor de ataques al body
    body.appendChild(ataquesDiv)

    // Devolver el contenedor con el juego completo
    return body
  }

  // Agregar el contenido del juego al divContent
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

  // Lógica para manejar el inicio del juego
  function iniciar() {
    seccionBatalla.style.display = 'none' // Esconde la sección de la batalla inicialmente
  }

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

  window.addEventListener('load', iniciar)
}
