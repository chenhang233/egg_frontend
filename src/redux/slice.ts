import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
  loginUser,
  getUserMenu,
  registerUser,
  getRolesread,
  readAuth,
  getUserInfo,
  uploadAvatar,
  setUserInfo,
  getsvgCaptcha,
} from '../api/user'
import {
  Condition_1,
  Condition_2,
  FormUserInfo,
  LOginData,
  LoginReduxData,
  Roles,
  SvgCaptcha,
} from '../api/APItype'
import { localStorage_add, localStorage_clear } from '../utils'
interface InitialState {
  info: LoginReduxData
  Roles: Roles[]
  interfaceAuth: Condition_1[]
  routerAuth: Condition_2[]
  text: string
  theme: 'default' | 'dark'
  isLogin: boolean
  svgCaptcha: SvgCaptcha | undefined
}

export const initialState: InitialState = {
  text: '文字test',
  info: {
    menu: {},
    userinfo: {},
  } as LoginReduxData,
  theme: 'default',
  Roles: [],
  interfaceAuth: [],
  routerAuth: [],
  isLogin: false,
  svgCaptcha: undefined,
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

export const getUserinfo = createAsyncThunk('getUserinfo', async () => {
  const data = await getUserInfo()
  return data
})
export const setUserinfo = createAsyncThunk(
  'setUserinfo',
  async (payload: FormUserInfo & { uuid: string }) => {
    const data = await setUserInfo(payload)
    return data
  }
)
export const getSvgCaptcha = createAsyncThunk('getSvgCaptcha', async () => {
  const { data } = await getsvgCaptcha()
  return data
})

export const getRolesRead = createAsyncThunk('getRolesRead', async () => {
  const data = await getRolesread()
  return data
})
export const setUploadAvatar = createAsyncThunk(
  'setUploadAvatar',
  async (payload: FormData) => {
    const data = await uploadAvatar(payload)
    return data
  }
)

export const getRoleConditionRead = createAsyncThunk(
  'getRoleConditionRead',
  async (payload: { condition: 'R' | 'I'; uuid?: number; roleP?: Roles[] }) => {
    let { uuid, roleP, condition } = payload
    let roleArr = null
    if (!uuid) {
      if (!roleP) {
        const roles = await getRolesread()
        roleArr = roles.data.data as Roles[]
        uuid = roleArr[0].uuid
      } else {
        uuid = roleP[0].uuid
      }
    }
    const {
      data: { data },
    } = await readAuth({ uuid, condition })
    return { roles: roleArr, data: data }
  }
)

export const stateSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeTheme: (user, action: PayloadAction<'default' | 'dark'>) => {
      user.theme = action.payload
    },
    logout: (user, action) => {
      localStorage_clear()
      user.info.menu.router = action.payload
      user.info.menu.menuInfo = action.payload
      user.isLogin = false
    },
    loginChange: (state) => {
      state.isLogin = true
      localStorage_add('isLogin', 'true')
    },
    setAvatar: (state, action: PayloadAction<string>) => {
      state.info.userinfo.avatar = action.payload
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
      if (action.payload.data) {
        const menu = action.payload.data.data.menu
        state.info.menu = menu
      }
    })
    builder.addCase(getUserinfo.fulfilled, (state, action) => {
      const userinfo = action.payload.data.data
      state.info.userinfo = userinfo
    })
    builder.addCase(getSvgCaptcha.fulfilled, (state, action) => {
      state.svgCaptcha = action.payload.data
    })
    builder.addCase(getRolesRead.fulfilled, (state, action) => {
      const routeArr = action.payload.data.data
      state.Roles = routeArr
    })
    builder.addCase(getRoleConditionRead.fulfilled, (state, action) => {
      const c = action.meta.arg.condition
      const { roles, data } = action.payload
      if (roles) {
        state.Roles = roles
      }
      if (c === 'I') {
        state.interfaceAuth = data as Condition_1[]
      }
      if (c === 'R') {
        state.routerAuth = data as Condition_2[]
      }
    })
  },
})

export const { changeTheme, logout, loginChange, setAvatar } =
  stateSlice.actions
export default stateSlice.reducer
