import { createSlice } from '@reduxjs/toolkit'

export interface CommonState {
  lang: string
}

const initialState: CommonState= {
    lang: 'en',
}

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        initLang: (state) => {
            state.lang = localStorage.getItem('lang') || ''
        },
    
    },
})

export const { initLang } = commonSlice.actions
export default commonSlice.reducer
