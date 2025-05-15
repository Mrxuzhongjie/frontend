import { defineStore } from 'pinia'
import userApi from '@/api'
import { ElMessage } from 'element-plus'

// 从localStorage获取初始状态
const getStoredState = () => {
  return {
    token: localStorage.getItem('token') || '',
    userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}')
  }
}

export const useUserStore = defineStore('user', {
  state: () => ({
    // 初始状态从localStorage获取
    ...getStoredState(),
    // 其他用户相关状态
    loading: false,
    rememberMe: !!localStorage.getItem('rememberedUsername')
  }),
  
  getters: {
    // 是否已登录
    isLoggedIn: (state) => !!state.token,
    // 获取用户名
    username: (state) => state.userInfo.username || '',
    // 获取记住的凭据
    rememberedCredentials: () => {
      return {
        username: localStorage.getItem('rememberedUsername') || '',
        password: localStorage.getItem('rememberedPassword') || ''
      }
    }
  },
  
  actions: {
    // 设置token并保存到localStorage
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },
    
    // 设置用户信息并保存到localStorage
    setUserInfo(userInfo) {
      this.userInfo = userInfo
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    
    // 保存记住的凭据
    saveCredentials(username, password, remember) {
      this.rememberMe = remember
      
      if (remember) {
        localStorage.setItem('rememberedUsername', username)
        localStorage.setItem('rememberedPassword', password)
      } else {
        localStorage.removeItem('rememberedUsername')
        localStorage.removeItem('rememberedPassword')
      }
    },
    
    // 登录
    async login(username, password, rememberMe) {
      this.loading = true
      try {
        const res = await userApi.login({ username, password })
        
        // 保存token
        this.setToken(res.token)
        
        // 处理记住密码
        this.saveCredentials(username, password, rememberMe)
        
        // 获取用户信息
        await this.getUserInfo()
        
        ElMessage.success('登录成功')
        return true
      } catch (error) {
        console.error('登录失败', error)
        ElMessage.error(error.message || '登录失败，请检查用户名和密码')
        return false
      } finally {
        this.loading = false
      }
    },
    
    // 获取用户信息
    async getUserInfo() {
      try {
        const res = await userApi.getUserInfo()
        console.log(res)
        this.setUserInfo(res || {})
        return res.data
      } catch (error) {
        console.error('获取用户信息失败', error)
        return null
      }
    },
    
    // 退出登录
    async logout() {
      // 先重置状态，确保本地状态立即被清除
      this.resetState()
      
      try {
        // 然后向服务器发送退出请求
        await userApi.logout()
        ElMessage.success('退出登录成功')
        return true
      } catch (error) {
        console.error('退出登录失败', error)
        ElMessage.error('退出登录失败，但已在本地登出')
        // 即使API请求失败，我们也已经在本地登出
        return true
      }
    },
    
    // 重置状态
    resetState() {
      this.token = ''
      this.userInfo = {}
      
      // 清除localStorage中的token和用户信息
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      
      // 保留记住的凭据
    }
  }
}) 