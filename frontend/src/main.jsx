import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import Alumnos from './Alumnos.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    

    <Alumnos />
    
    
  </StrictMode>,
)
