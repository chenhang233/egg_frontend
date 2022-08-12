import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getuserInfo } from '../api/user'
import { LOginData, LoginReduxData } from '../api/APItype'
interface InitialState {
  info: LoginReduxData | null
  count: number
  text: string
  theme: 'default' | 'dark'
}

const initialState: InitialState = {
  count: 0,
  text: '我是文字',
  info: null,
  theme: 'default',
}

export interface PromiseNum {
  number: number
}

// 异步Action
export const getUserInfo = createAsyncThunk(
  'getRouterInfo',
  async (payload: LOginData) => {
    const data = await getuserInfo(payload)
    return data
  }
)

export const stateSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeTheme: (user, action: PayloadAction<'default' | 'dark'>) => {
      user.theme = action.payload
    },
    add: (state) => {
      state.count += 1
    },
    minus: (state) => {
      state.count -= 1
    },
    change: (state) => {
      state.text = '我是改变了的文字'
    },
    back: (state) => {
      state.text = '我是文字'
    },
  },
  extraReducers: (builder) => {
    // 进行请求阶段的一些操作
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.info = action.payload.data.data
    })
    builder.addCase(getUserInfo.pending, () => {
      console.log('登录 action pending')
    })
    builder.addCase(getUserInfo.rejected, () => {
      console.log('登录 action失败')
    })
  },
})

export const { add, minus, change, back, changeTheme } = stateSlice.actions
export default stateSlice.reducer
