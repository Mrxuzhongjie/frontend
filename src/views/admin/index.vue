<template>
  <div class="admin-container">
    <el-container>
      <el-header>
        <div class="header-container">
          <div class="logo">后台管理系统</div>
          <div class="user-info">
            <el-dropdown>
              <span class="user-dropdown-link">
                欢迎, {{ userStore.userInfo.username || 'Admin' }} 
                <el-icon><ArrowDown /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item>修改密码</el-dropdown-item>
                  <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="1-1"
            class="admin-menu"
            background-color="#304156"
            text-color="#bfcbd9"
            active-text-color="#409EFF"
            :unique-opened="true"
            :collapse-transition="false"
          >
            <!-- 仪表盘菜单项 -->
            <el-menu-item index="1">
              <el-icon><Document /></el-icon>
              <span>仪表盘</span>
            </el-menu-item>
            
            <!-- 用户管理子菜单 -->
            <el-sub-menu index="2">
              <template #title>
                <el-icon><User /></el-icon>
                <span>用户管理</span>
              </template>
              <el-menu-item index="2-1">用户列表</el-menu-item>
              <el-menu-item index="2-2">添加用户</el-menu-item>
              <el-menu-item index="2-3">用户组管理</el-menu-item>
            </el-sub-menu>
            
            <!-- 权限管理子菜单 -->
            <el-sub-menu index="3">
              <template #title>
                <el-icon><Lock /></el-icon>
                <span>权限管理</span>
              </template>
              <el-menu-item index="3-1">角色管理</el-menu-item>
              <el-menu-item index="3-2">权限配置</el-menu-item>
            </el-sub-menu>
            
            <!-- 系统设置子菜单 -->
            <el-sub-menu index="4">
              <template #title>
                <el-icon><Setting /></el-icon>
                <span>系统设置</span>
              </template>
              <el-menu-item index="4-1">基础设置</el-menu-item>
              <el-menu-item index="4-2">安全设置</el-menu-item>
              <el-menu-item index="4-3">日志管理</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-card class="welcome-card">
            <h1>欢迎使用后台管理系统</h1>
            <p>您已成功登录，这是后台管理页面。</p>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { Document, User, Setting, ArrowDown, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const handleLogout = () => {
  ElMessageBox.confirm('确定要退出登录吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    // 先执行退出登录
    await userStore.logout()
    
    // 无论成功失败，都跳转到登录页
    // 这样可以确保即使API调用失败，用户也能正常登出
    router.push('/login')
  }).catch(() => {
    // 用户取消操作，不做任何处理
  })
}
</script>

<style scoped>
.admin-container {
  height: 100vh;
}

.el-header {
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: relative;
  padding: 0;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 20px;
}

.logo {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
}

.user-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #303133;
}

.el-aside {
  background-color: #304156;
}

.admin-menu {
  height: 100%;
  border-right: none;
}

.el-main {
  background-color: #f0f2f5;
  padding: 20px;
}

.welcome-card {
  margin-bottom: 20px;
}

h1 {
  margin-top: 0;
}
</style> 