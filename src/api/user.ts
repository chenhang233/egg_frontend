import {
  LOginData,
  LoginReturn,
  MenusReturn,
  RefreshTokenReturn,
  RegisterReturn,
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
