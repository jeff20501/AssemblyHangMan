import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Hang_Man/style.css'
import { Main } from './Hang_Man/Main'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main />
  </StrictMode>
)
