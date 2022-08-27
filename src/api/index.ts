import axios, { AxiosError, AxiosResponse } from 'axios'
import { BASE_RETURN } from './APItype'
import { message } from 'antd'
import {
  localStorage_add,
  localStorage_clear,
  localStorage_get,
} from '../utils'
import { history } from '../index'
import { getUserToken, logoutUser } from './user'

export const success = (msg?: string) => {
  message.success(msg || '成功', 3)
}

export const error = (msg?: string) => {
  message.error(msg || 'error', 3)
}

export const warning = (msg?: String) => {
  message.warning(msg || 'WARNIMG', 3)
}

const instance = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_URL,
  timeout: 2000,
  //   headers: {'X-Custom-Header': 'foobar'}
})

instance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (config.headers) {
      let token = localStorage_get('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
let errorArr: any[] = []
const notHandleInterface = ['/users/getUserMenus']
// 添加响应拦截器
instance.interceptors.response.use(
  function (response: AxiosResponse<BASE_RETURN<any>>) {
    // 对响应数据做点什么
    if (response.status === 200) {
      const res = response.data
      const url = response.config.url || ''
      if (res.code === 1) {
        const token = localStorage_get('token')
        if (!token) {
          history.push('/login')
        }
        if (notHandleInterface.includes(url)) {
          return res
        }
        return error(res.message)
      }
      return response
    }
  },
  async function (e: AxiosError<BASE_RETURN<any>>) {
    if (e.code === 'ECONNABORTED') {
      return error('远程主机拒绝网络连接')
    }
    if (e.response && e.response.status === 401) {
      const refToken = localStorage_get('refreshToken')
      errorArr.push(refToken)
      const config = e.config
      if (refToken && errorArr.length < 2) {
        const {
          data: { data, code },
        } = await getUserToken(`Bearer ${refToken}`)
        if (code === 0) {
          localStorage_add('token', data.token)
          return instance(config)
        }
        if (code === 1) {
          return error(e.response.data.message)
        }
      }
    } else if (e.response && e.response.status === 403) {
      const { code, uuid } = e.response.data.data
      localStorage_clear()
      errorArr = []
      history.replace('/login')
      if (code === 403) {
        await logoutUser({ uuid: uuid, logoutTime: Date.now() })
      }
      return 403
    } else {
      error('未知响应错误')
      throw new Error('服务器error')
    }
    // 对响应错误做点什么
  }
)
export default instance
