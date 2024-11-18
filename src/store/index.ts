import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import counterReducer from './reducer/counterReducer'
import commonReducer from './reducer/commonReducer'
import { counterTransform } from './persistTransforms'
import encryptReducer from './reducer/encryptReducer'

// 配置redux-persist 持久化
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['counter', 'encrypt'], //只针对 白名单中的reducer 做持久化
    transforms: [counterTransform] // 指定只持久化reducer中的具体state
}


// 使用 persistedReducer 来包装持久化的 reducer
const persistedCounterReducer = persistReducer(persistConfig, counterReducer)
const persistedEncryptReducer = persistReducer(persistConfig, encryptReducer)

// 根reducer

const rootReducer = {
    counter: persistedCounterReducer,
    common: commonReducer,
    encrypt: persistedEncryptReducer
}

// 创建持久化 reducer
// const persistedReducer = persistReducer(persistConfig, (state, action) => ({
//     counter: rootReducer.counter(state?.counter, action),
//     encrypt: rootReducer.encrypt(state?.encrypt, action),
//     
// }))
// const persistedReducer = persistReducer(persistConfig, rootReducer as any);

// const persistedCounterReducer = persistReducer(persistConfig, counterReducer)
// const persistedEncryptReducer = persistReducer(persistConfig, encryptReducer)

const store = configureStore({
    reducer: rootReducer,
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
