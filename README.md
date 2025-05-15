# Vue3权限管理系统前端项目

基于Vue3、Element Plus、Pinia的权限管理系统前端

## 技术栈

- Vue 3.x
- Vue Router 4.x
- Pinia
- Element Plus
- Axios

## 功能特性

- 登录/登出
- 记住密码功能
- 路由权限控制
- 用户管理
- 权限管理
- 系统设置

## 项目设置

### 安装依赖
```bash
npm install
```

### 开发环境运行
```bash
npm run serve
```

### 生产环境构建
```bash
npm run build
```

### 代码检查
```bash
npm run lint
```

## 项目结构

```
src/
├── api/           # API请求
├── assets/        # 静态资源
├── components/    # 公共组件
├── router/        # 路由配置
├── stores/        # Pinia状态管理
├── views/         # 页面视图
└── App.vue        # 根组件
```

## 使用说明

1. 用户可以通过登录页面进入系统
2. 默认账号密码可配置
3. 登录后可以访问系统管理功能

## Git使用

项目使用Git进行版本控制，以下是常用操作流程：

### 初始化仓库与远程连接

```bash
# 初始化Git仓库
git init

# 添加远程仓库
git remote add origin https://github.com/username/repo-name.git

# 查看远程仓库信息
git remote -v
```

### 日常代码提交流程

```bash
# 查看文件状态
git status

# 添加所有更改到暂存区
git add .

# 提交更改
git commit -m "实现基于Vue3的权限管理系统，包含登录、状态管理和菜单功能"

# 推送到远程仓库
git push origin master
```

### 查看历史提交

```bash
# 查看提交历史
git log --oneline -n 5

# 查看特定文件的更改
git diff --stat
```

### 分支管理

```bash
# 创建新分支
git checkout -b feature/login

# 切换分支
git checkout master

# 合并分支
git merge feature/login

# 删除分支
git branch -d feature/login
```

