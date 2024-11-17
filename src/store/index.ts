import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import counterReducer from './reducer/counterReducer'
import commonReducer from './reducer/commonReducer'
import { counterTransform } from './persistTransforms'

// 配置redux-persist 持久化
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['counter'], //只针对 白名单中的reducer 做持久化
  transforms: [counterTransform] // 指定只持久化reducer中的具体state
}

// 根reducer

const rootReducer = {
  counter: counterReducer,
  common: commonReducer,
}

// 创建持久化 reducer
const persistedReducer = persistReducer(persistConfig, (state, action) => ({
  counter: rootReducer.counter(state?.counter, action),
  common: rootReducer.common(state?.common, action),
}))

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// 从 store 中导出 RootState 和 AppDispatch 类型，以便后续使用
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
