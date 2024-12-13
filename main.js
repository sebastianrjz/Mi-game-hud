import { Header } from './src/components/Header/Header'
import { initMole } from './src/data/adivina/adivina'
import { initPpt } from './src/data/Ppt/ppt'
import { inittres } from './src/data/tresenraya/tres'
import './style.css'

const divApp = document.querySelector('#app')

Header(divApp) // Llama a la función que crea el header

const divContent = document.createElement('div')
divContent.className = 'content' // Asegura que tenga la clase para aplicar el margen superior

divApp.append(divContent)
initPpt()
inittres()
initMole()
