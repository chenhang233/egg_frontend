import axios, { AxiosError, AxiosResponse } from 'axios'
import { BASE_RETURN } from './APItype'
import { message } from 'antd'

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

instance.defaults.headers.common['Authorization'] = 'token xxxxx'
instance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response: AxiosResponse<BASE_RETURN<any>>) {
    // 对响应数据做点什么
    if (response.status === 200) {
      const res = response.data
      if (res.code === 1) {
        return error(res.message)
      }
      return response
    }
  },
  function (e: AxiosError) {
    if (e.code === 'ECONNABORTED') {
      return error('远程主机拒绝网络连接')
    }
    throw new Error('服务器error')
    // 对响应错误做点什么
  }
)
export default instance
