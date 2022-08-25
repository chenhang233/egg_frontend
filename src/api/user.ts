import {
  AddRole,
  AddRoleReturn,
  LOginData,
  LoginReturn,
  MenusReturn,
  readAuthData,
  readAuthReturn,
  RefreshTokenReturn,
  RegisterReturn,
  removeRoleReturn,
  RolesReadReturn,
  SingleInterface,
  SingleInterfaceReturn,
  SingleRouter,
  SingleRouterReturn,
  VisitNumberReturn,
} from './APItype'
import http from './index'

export const loginUser = (data: LOginData) =>
  http.post<LoginReturn>('/users/login', data)

export const registerUser = (data: LOginData) =>
  http.post<RegisterReturn>('/users/register', data)

export const getUserMenu = () => http.post<MenusReturn>('/users/getUserMenus')

export const getUserToken = (refreshToken: string) =>
  http.post<RefreshTokenReturn>('/users/getToken', {
    refreshToken: refreshToken,
  })

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
