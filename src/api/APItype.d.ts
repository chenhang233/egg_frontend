export interface BASE_RETURN<T> {
  code: 0 | 1
  message: string
  data: T
}
export type FormUserInfo = {
  nickname: string
  sex: string
  phone: string | null
  address: string | null
  introduction: string | null
  avatar: string
}
export type UserInfo = FormUserInfo & {
  password: string
  lastLoginTime: string | null
  otherRoleIds: string | null
  registerTime: string | string
  username: string
  uuid: string
}
export interface Route {
  routerName: string
  rootId: string
  parentId: string | null
  icon: string | null
  routerSrc: string | undefined
  auth: boolean
  uuid: number
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
  captcha: string
}
export interface LoginReduxData {
  refreshToken: string
  token: string
  menu: Menu
  userinfo: UserInfo
}

export interface LogoutData {
  uuid: string
  logoutTime: number
}

export interface readAuthData {
  uuid: number
  condition: 'R' | 'I'
}
export interface SingleRouter {
  uuid: number
  routerId: number
}
export interface SingleInterface {
  uuid: number
  interfaceId: number
}
export interface Roles {
  uuid: number
  roleName: string
  roleMark?: string
  canDelete: boolean
}

export type AddRole = Omit<Roles, 'uuid'>

interface Condition_1 {
  uuid: number
  name: string
  url: string
  auth: boolean
  [key: string]: any
}
interface Condition_2 extends Route {
  children?: Condition_2[]
  [key: string]: any
}

interface Visit_obj {
  loginTime: string
  logoutTime: string | null
  username: string
}

interface SvgCaptcha {
  rect: { fill: string }
  path: { fill: string; d: string; stroke?: string }[]
  text: string
}

export type LoginReturn = BASE_RETURN<{
  refreshToken: string
  token: string
  // userinfo: UserInfo
}>

export type LogoutReturn = BASE_RETURN<[]>

export type RegisterReturn = BASE_RETURN<LOginData>

export type getUserInfoReturn = BASE_RETURN<UserInfo>

export type MenusReturn = BASE_RETURN<{ menu: Menu }>

export type RefreshTokenReturn = BASE_RETURN<{ token: string }>

export type UploadAvatarReturn = BASE_RETURN<[]>

export type SetUserInfoReturn = BASE_RETURN<[]>

export type SvgCaptchaReturn = BASE_RETURN<SvgCaptcha>

export type RolesReadReturn = BASE_RETURN<Roles[]>

export type AddRoleReturn = BASE_RETURN<[]>

export type removeRoleReturn = BASE_RETURN<[]>

export type readAuthReturn = BASE_RETURN<Condition_1[] | Condition_2[]>

export type SingleRouterReturn = BASE_RETURN<[]>

export type SingleInterfaceReturn = BASE_RETURN<[]>

export type VisitNumberReturn = BASE_RETURN<{
  details: Visit_obj[]
  count: number
}>

export type DynamicApacheDataJsonReturn = BASE_RETURN<
  {
    code: string
    dialCode: string
    emoji: string
    name: string
    title: string
    unicode: string
  }[]
>
export type DynamicApacheTableJsonReturn = BASE_RETURN<(string | number)[][]>
