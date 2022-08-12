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
export type LoginReturn = BASE_RETURN<{
  refreshToken: string
  token: string
  menu: Menu
  userinfo: UserInfo
}>
