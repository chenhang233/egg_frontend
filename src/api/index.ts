import axios from 'axios'

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
  function (response) {
    // 对响应数据做点什么
    if (response.status === 200) {
      return response.data
    }
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export default instance
