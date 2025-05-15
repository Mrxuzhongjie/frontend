<template>
  <div class="login-container">
    <el-card class="login-card">
      <div class="login-title">
        <h2>系统登录</h2>
      </div>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-width="0"
        size="large"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            :prefix-icon="User"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            show-password
            type="password"
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <el-form-item>
          <div class="login-options">
            <el-checkbox v-model="loginForm.rememberMe">记住密码</el-checkbox>
            <el-link type="primary">忘记密码?</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="userStore.loading"
            class="login-button"
            type="primary"
            @click="handleLogin"
          >
            {{ userStore.loading ? '登录中...' : '登录' }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Lock, User } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const loginFormRef = ref(null)
const userStore = useUserStore()

// 获取记住的凭据
const rememberedCredentials = userStore.rememberedCredentials

// 表单数据
const loginForm = reactive({
  username: rememberedCredentials.username,
  password: rememberedCredentials.password,
  rememberMe: !!rememberedCredentials.username
})

const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度应在3-20个字符之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码不能少于6个字符', trigger: 'blur' }
  ]
}

const handleLogin = () => {
  loginFormRef.value.validate(async (valid) => {
    if (!valid) return
    console.log(loginForm.username, loginForm.password)
    
    // 调用store中的登录方法
    const success = await userStore.login(
      loginForm.username,
      loginForm.password,
      loginForm.rememberMe
    )
    
    if (success) {
      // 登录成功，跳转到管理页面
      router.push('/admin')
    }
  })
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.login-card {
  width: 400px;
  border-radius: 8px;
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
}

.login-title h2 {
  font-weight: 600;
  color: #303133;
  margin: 0;
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login-button {
  width: 100%;
  margin-top: 10px;
}
</style> 