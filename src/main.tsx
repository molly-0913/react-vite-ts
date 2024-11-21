import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css'
import '@/styles/index.scss'
import './i18n'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store, { persistor } from './store'
import { injectStore } from "@/utils/tools.ts"
injectStore(store) //在请求中直接使用stroe获取值 和 createAsyncThunk 异步请求会冲突导致循环调用 reducer报错
// import { registerSW } from 'virtual:pwa-register' 开启桌面应用
// registerSW({ immediate: true })


// Tip: react18 使用StrictMode 会在开发环境渲染两次
createRoot(document.getElementById('root')!).render(
 <StrictMode>
    <Provider store={store}>
      <PersistGate  persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
</StrictMode>
)
