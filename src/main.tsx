import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CVPage } from './CVPage.tsx'

const isCVRoute = window.location.pathname.replace(/\/+$/, '') === '/cv'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isCVRoute ? <CVPage /> : <App />}
  </StrictMode>,
)
