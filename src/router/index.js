import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/admin/index.vue'),
    meta: {
      requiresAuth: true
    }
  },
  // 404页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫，用于验证用户是否已登录
router.beforeEach((to, from, next) => {
  // 通过检查localStorage token实现
  const token = localStorage.getItem('token')
  const isLoggedIn = !!token
  
  if (to.meta.requiresAuth && !isLoggedIn) {
    // 需要认证但没有登录，重定向到登录页
    next({ path: '/login' })
  } else if (to.path === '/login' && isLoggedIn) {
    // 已登录用户再次访问登录页，重定向到管理页
    next({ path: '/admin' })
  } else {
    next()
  }
})

export default router 