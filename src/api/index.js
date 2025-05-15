import request from './request'

// 用户相关接口
const userApi = {
  // 用户登录
  login: (data) => request.post('/auth/login', data),
  
  // 获取用户信息
  getUserInfo: () => request.get('/auth/info'),
  
  // 退出登录
  logout: () => request.post('/auth/logout')
}

// 如果需要其他自定义请求，可以在这里添加使用方法
// 例如: userApi.customRequest = (url, data) => request.post(url, data)

// 默认导出userApi
export default userApi 