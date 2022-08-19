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
