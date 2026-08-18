import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { BackendProvider } from './context/BackendContext'
import { ToastContainer } from './components/Toast'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <BackendProvider>
        <App />
        <ToastContainer />
      </BackendProvider>
    </BrowserRouter>
  </StrictMode>,
)
