import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './HangMan/style.css'
import { Main } from './HangMan/Main'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
  </StrictMode>
)
