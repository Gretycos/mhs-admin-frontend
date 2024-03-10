/**
 * author: Tsong
 * time: 09/03/2024 20:41
 */
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import globalSlice from "@/redux/slice/globalSlice.js";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

//create reducer
const reducers = combineReducers({
    globalSlice
})

//持久化存储
const persistConfig = {
    key: 'redux-state', // 储存的标识名
    storage // 储存方式
}

const persistReducerConfig = persistReducer(persistConfig, reducers)

// 创建 store
const store = configureStore({
    reducer: persistReducerConfig,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            //关闭redux序列化检测
            serializableCheck: false
        })
})

//创建持久化store
const persistor = persistStore(store)

export { store, persistor }
