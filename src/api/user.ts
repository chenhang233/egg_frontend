import {
  AddRole,
  AddRoleReturn,
  FormUserInfo,
  getUserInfoReturn,
  LOginData,
  LoginReturn,
  LogoutData,
  LogoutReturn,
  MenusReturn,
  readAuthData,
  readAuthReturn,
  RefreshTokenReturn,
  RegisterReturn,
  removeRoleReturn,
  RolesReadReturn,
  SetUserInfoReturn,
  SingleInterface,
  SingleInterfaceReturn,
  SingleRouter,
  SingleRouterReturn,
  SvgCaptchaReturn,
  UploadAvatarReturn,
  VisitNumberReturn,
} from './APItype'
import http from './index'

export const loginUser = (data: LOginData) =>
  http.post<LoginReturn>('/users/login', data)

export const logoutUser = (data: LogoutData) =>
  http.post<LogoutReturn>('/users/logout', data)

export const registerUser = (data: LOginData) =>
  http.post<RegisterReturn>('/users/register', data)

export const getUserMenu = () => http.post<MenusReturn>('/users/getUserMenus')
export const getUserInfo = () =>
  http.post<getUserInfoReturn>('/users/getUserInfo')

export const getUserToken = (refreshToken: string) =>
  http.post<RefreshTokenReturn>('/users/getToken', {
    refreshToken: refreshToken,
  })

export const uploadAvatar = (file: FormData) =>
  http.post<UploadAvatarReturn>('/users/uploadAvatar', file)

export const setUserInfo = (data: FormUserInfo & { uuid: string }) =>
  http.post<SetUserInfoReturn>('/users/setUserInfo', data)

export const getRolesread = () => http.post<RolesReadReturn>('/roles/read')

export const setAddrole = (obj: AddRole) =>
  http.post<AddRoleReturn>('/roles/add', obj)

export const deleteRole = (uuid: number) =>
  http.post<removeRoleReturn>('/roles/delete', { uuid })

export const readAuth = (obj: readAuthData) =>
  http.post<readAuthReturn>('/authorization/readAuth', obj)

export const removeRouter = (obj: SingleRouter) =>
  http.post<SingleRouterReturn>('/authorization/removeRouter', obj)

export const addRouter = (obj: SingleRouter) =>
  http.post<SingleRouterReturn>('/authorization/addRouter', obj)

export const removeInterFace = (obj: SingleInterface) =>
  http.post<SingleInterfaceReturn>('/authorization/removeInterFace', obj)

export const addInterface = (obj: SingleInterface) =>
  http.post<SingleInterfaceReturn>('/authorization/addInterface', obj)

export const visitNum = () =>
  http.get<VisitNumberReturn>('/dashboard/visitNumbers')

export const getsvgCaptcha = () =>
  http.get<SvgCaptchaReturn>('/users/getSvgCaptcha')
