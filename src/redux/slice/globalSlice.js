/**
 * author: Tsong
 * time: 09/03/2024 20:42
 */
import { createSlice } from '@reduxjs/toolkit'

const globalSlice = createSlice({
    name: 'global',
    initialState: {
        user_token: '',
        user_id: ''
    },
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload }
        }
    }
})

export const { save } = globalSlice.actions

export default globalSlice.reducer
