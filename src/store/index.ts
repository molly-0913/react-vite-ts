import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import counterReducer from './reducer/counterReducer'
import commonReducer from './reducer/commonReducer'
// import { counterTransform } from './persistTransforms'
import encryptReducer from './reducer/encryptReducer'
import deviceReducer from "./reducer/deviceReducer"

import { combineReducers } from 'redux'


// 配置redux-persist 持久化
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['counter','encrypt', 'device'], //只针对 白名单中的reducer 做持久化
  blackList: ['common'],
  // transforms: [counterTransform] // 指定只持久化reducer中的具体state, 建议持久化的state 和 不需要持久化的 state 放不同的文件
}



// 方法一： 使用了持久化 搭配使用combineReducers
const rootReducer = combineReducers({
  counter: counterReducer,
  common: commonReducer,
  encrypt: encryptReducer,
  device: deviceReducer
})

// 创建持久化 reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)


// 方法二：不使用combineReducers 但需要对reducer 定义ts类型

// const rootReducer = {
//     counter: counterReducer,
//     common: commonReducer,
//     encrypt: encryptReducer,
//     device: deviceReducer
// }
// const persistedReducer = persistReducer(persistConfig, (state, action) => ({
//     counter: rootReducer.counter(state?.counter, action),
//     common: rootReducer.common(state?.common, action),
//     encrypt: rootReducer.encrypt(state?.encrypt, action),
//     device: rootReducer.device(state?.device, action),
    
// }))


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
