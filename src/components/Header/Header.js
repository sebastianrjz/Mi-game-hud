// src/components/Header/Header.js
import { initPpt } from '../../data/Ppt/ppt'
import { initMole } from '../../data/adivina/adivina'
import { inittres } from '../../data/tresenraya/tres'
import './Header.css'

export const Header = (divApp) => {
  const header = document.createElement('header')
  header.classList.add('header') // Añadimos la clase 'header' para darle estilo

  const buttonPpt = document.createElement('button')
  const buttonWhack = document.createElement('button')
  const buttontres = document.createElement('button')
  buttonPpt.textContent = 'Piedra Papel o Tijera'
  buttonWhack.textContent = 'preguntas'
  buttontres.textContent = 'click tres-lineas'
  buttontres.addEventListener('click', inittres)
  buttonPpt.addEventListener('click', initPpt)
  buttonWhack.addEventListener('click', initMole)

  header.append(buttontres)
  header.append(buttonPpt)
  header.append(buttonWhack)

  divApp.append(header)
}
