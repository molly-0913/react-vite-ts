import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css'
import '@/styles/index.scss'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store, { persistor } from './store'
import { injectStore } from './httpRequest/request.ts'
injectStore(store) //在请求中直接使用stroe获取值 和 createAsyncThunk 异步请求会冲突导致循环调用 reducer报错

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
