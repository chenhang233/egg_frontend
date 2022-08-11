import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getuserInfo } from '../api/user'
import { LOginData, LoginReturn } from '../api/APItype'
interface InitialState {
  userinfo: LoginReturn | {}
  count: number
  text: string
}

const initialState: InitialState = {
  count: 0,
  text: '我是文字',
  userinfo: {},
}

export interface PromiseNum {
  number: number
}

const promise_one: Promise<PromiseNum> = new Promise((res, rej) => {
  setTimeout(() => {
    res({ number: 10 })
  }, 3000)
})

// 异步Action
export const getAsyncInfo = createAsyncThunk('getAsyncInfo', async () => {
  console.log('12313132')

  const data = await promise_one
  return data
})

export const getUserInfo = createAsyncThunk(
  'getRouterInfo',
  async (payload: LOginData) => {
    const data = await getuserInfo(payload)
    return data
  }
)

export const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
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
    builder.addCase(getAsyncInfo.pending, () => {
      console.log('进行中')
    })
    builder.addCase(getAsyncInfo.fulfilled, (state, action) => {
      state.count += action.payload.number
    })
    builder.addCase(getAsyncInfo.rejected, () => {
      console.log('失败')
    })
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.userinfo = action.payload
    })
    builder.addCase(getUserInfo.pending, () => {
      console.log('登录 action')
    })
    builder.addCase(getUserInfo.rejected, () => {
      console.log('登录 action失败')
    })
  },
})

export const { add, minus, change, back } = stateSlice.actions
export default stateSlice.reducer
