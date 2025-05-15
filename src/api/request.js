import axios from 'axios'

// 创建axios实例
const request = axios.create({
  baseURL: 'http://localhost:8000/api', // api的base_url
  timeout: 10000 // 请求超时时间
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么，比如添加token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['authorization'] = token
    }
    return config
  },
  error => {
    // 对请求错误做些什么
    console.error('请求错误：', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    const res = response.data
    // 如果是下载文件直接返回
    if (response.config.responseType === 'blob') {
      return res
    }
    
    // 根据约定的返回格式处理数据
    if (res.code && res.code !== 200) {
      console.error('响应错误代码：', res.code, res.message)
      return Promise.reject(new Error(res.message || '未知错误'))
    } else {
      return res
    }
  },
  error => {
    console.error('响应错误：', error)
    return Promise.reject(error)
  }
)

export default request 