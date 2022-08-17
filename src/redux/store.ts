import { configureStore } from '@reduxjs/toolkit'
// import thunkMiddleware from 'redux-thunk'
import stateSlice from './slice'
// import otherSlice from "./otherSlice";

export const store = configureStore({
  // 每个reducer代表一个模块的状态管理器
  reducer: {
    user: stateSlice,
    // other: otherSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
})

// RootState作用是返回store的方法getState的类型 function
export type RootState = ReturnType<typeof store.getState>

// AppDispatch 作用是拿到Store的dispatch方法的类型 function
export type AppDispatch = typeof store.dispatch
