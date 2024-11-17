import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './index'

// 使用 `AppDispatch` 类型创建类型化的 `useDispatch`
export const useAppDispatch: () => AppDispatch = useDispatch
// 使用 `RootState` 类型创建类型化的 `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
