import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  count: number,
  ax: number
}

const initialState: CounterState = {
  count: 0,
  ax: -3
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1
    },
    decrement: (state) => {
      state.count -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload
    },
    addNum: (state) => {
      state.ax +=2
    }
  },
})

export const { 
  increment, 
  decrement, 
  incrementByAmount,
  addNum 
} = counterSlice.actions
export default counterSlice.reducer
