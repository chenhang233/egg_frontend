import { LOginData, LoginReturn, RegisterReturn } from './APItype'
import http from './index'

export const getuserInfo = (data: LOginData) =>
  http.post<LoginReturn>('/users/login', data)

export const registerUser = (data: LOginData) =>
  http.post<RegisterReturn>('/users/register', data)
