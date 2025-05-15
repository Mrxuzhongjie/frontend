<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>页面未找到</h2>
    <p>抱歉，您访问的页面不存在</p>
    <el-button type="primary" @click="backToHome">返回首页</el-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const backToHome = () => {
  router.push('/')
}
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

h1 {
  font-size: 100px;
  margin: 0;
  color: #409EFF;
}

h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #606266;
}

p {
  margin-bottom: 30px;
  color: #909399;
}
</style> 