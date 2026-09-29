import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const rootElement = document.getElementById('root')
const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

if (rootElement.dataset.prerenderedPath === currentPath) {
  hydrateRoot(rootElement, app)
} else {
  rootElement.replaceChildren()
  createRoot(rootElement).render(app)
}
