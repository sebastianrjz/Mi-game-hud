import './Ppt.css'
// crearJuego.js

export function crearJuego() {
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
