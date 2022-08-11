import { LOginData, LoginReturn } from './APItype'
import http from './index'

export const getuserInfo = (data: LOginData) =>
  http.post<LoginReturn>('/users/login', data)
