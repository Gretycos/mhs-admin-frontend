/**
 * author: Tsong
 * time: 09/03/2024 20:42
 */
import { createSlice } from '@reduxjs/toolkit'

const globalSlice = createSlice({
    name: 'global',
    initialState: {
        token: '',
        adminId: ''
    },
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload }
        }
    }
})

export const { save } = globalSlice.actions

export default globalSlice.reducer
