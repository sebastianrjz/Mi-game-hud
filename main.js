import { Header } from './src/components/Header/Header'
import { initMole } from './src/pages/adivina/adivina'
import { initPpt } from './src/pages/Ppt/Ppt'
import { inittres } from './src/pages/tresenraya/tres'
import './style.css'

const divApp = document.querySelector('#app')

Header(divApp) // Llama a la función que crea el header

const divContent = document.createElement('div')
divContent.className = 'content' // Asegura que tenga la clase para aplicar el margen superior

divApp.append(divContent)
initPpt()
inittres()
initMole()
