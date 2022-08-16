import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { loginUser, getUserMenu, registerUser } from '../api/user'
import { LOginData, LoginReduxData } from '../api/APItype'
import { localStorage_add } from '../utils'
interface InitialState {
  info: LoginReduxData
  count: number
  text: string
  theme: 'default' | 'dark'
}

const initialState: InitialState = {
  count: 0,
  text: '我是文字',
  info: {
    menu: {},
    userinfo: {},
  } as LoginReduxData,
  theme: 'default',
}

export interface PromiseNum {
  number: number
}

// 异步Action
export const _loginUser = createAsyncThunk(
  'loginUser',
  async (payload: LOginData) => {
    const data = await loginUser(payload)
    return data
  }
)
export const getRegisterUser = createAsyncThunk(
  'getRegisterUser',
  async (payload: LOginData) => {
    const data = await registerUser(payload)
    return data
  }
)
export const getUserMenus = createAsyncThunk('getUserMenus', async () => {
  const data = await getUserMenu()
  return data
})

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
    builder.addCase(_loginUser.fulfilled, (state, action) => {
      const data = action.payload.data.data
      state.info.token = data.token
      state.info.refreshToken = data.refreshToken
      localStorage_add('token', data.token)
      localStorage_add('refreshToken', data.refreshToken)
    })
    builder.addCase(_loginUser.pending, () => {
      console.log('登录 action pending')
    })
    builder.addCase(_loginUser.rejected, () => {
      console.log('登录 action失败')
    })
    builder.addCase(getRegisterUser.fulfilled, (state, action) => {
      console.log(action.payload.data.data) // 触发error
    })
    builder.addCase(getUserMenus.fulfilled, (state, action) => {
      const menu = action.payload.data.data.menu
      state.info.menu = menu
    })
    builder.addCase(getUserMenus.rejected, () => {})
  },
})

export const { add, minus, change, back, changeTheme } = stateSlice.actions
export default stateSlice.reducer
