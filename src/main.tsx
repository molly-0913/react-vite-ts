import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css'
import '@/styles/index.scss'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store, { persistor } from './store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate  persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
      
    </Provider>
    
  </StrictMode>,
)
