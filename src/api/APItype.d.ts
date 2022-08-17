export interface BASE_RETURN<T> {
  code: 0 | 1
  message: string
  data: T
}
export type UserInfo = {
  id: 20
  password: string
  lastLoginTime: string | null
  otherRoleIds: string | null
  name: string
  sex: string
  phone: string | null
  address: string | null
  introduction: string | null
  registerTime: string | string
  avatar: string
  username: string
}
export interface Route {
  routerName: string
  rootId: string
  parentId: string | null
  icon: string | null
  routerSrc: string | null
  auth: boolean
  uuid: stirng
}
export type Menu = {
  menuInfo: {
    roleName: string
    roleMark: string
  }
  router: Route[]
}
export type LOginData = {
  username: string
  password: string
}
export interface LoginReduxData {
  refreshToken: string
  token: string
  menu: Menu
  userinfo: UserInfo
}

export interface Roles {
  uuid: number
  roleName: string
  roleMark: string
}

export type LoginReturn = BASE_RETURN<{
  refreshToken: string
  token: string
  // userinfo: UserInfo
}>

export type RegisterReturn = BASE_RETURN<LOginData>

export type MenusReturn = BASE_RETURN<{ menu: Menu }>

export type RefreshTokenReturn = BASE_RETURN<{ token: string }>

export type RolesReadReturn = BASE_RETURN<Roles[]>
