// src/components/Header/Header.js
import { initPpt } from '../../pages/Ppt/Ppt'
import { initMole } from '../../pages/adivina/adivina'
import { inittres } from '../../pages/tresenraya/tres'
import './Header.css'

export const Header = (divApp) => {
  const header = document.createElement('header')
  header.classList.add('header') // Añadimos la clase 'header' para darle estilo

  const buttonPpt = document.createElement('button')
  const buttonWhack = document.createElement('button')
  const buttontres = document.createElement('button')
  buttonPpt.textContent = 'Piedra Papel o Tijera'
  buttonWhack.textContent = 'adivina el numero'
  buttontres.textContent = 'click tres-lineas'
  buttontres.addEventListener('click', inittres)
  buttonPpt.addEventListener('click', initPpt)
  buttonWhack.addEventListener('click', initMole)

  header.append(buttontres)
  header.append(buttonPpt)
  header.append(buttonWhack)

  divApp.append(header)
}
