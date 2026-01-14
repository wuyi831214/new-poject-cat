# 部署指南

本文档介绍如何部署 PawPals 宠物领养应用。

## 前置要求

- Node.js 18+ 
- Supabase 账户
- GitHub 账户 (用于部署)

## 部署步骤

### 1. 配置 Supabase

1. 创建 Supabase 项目
2. 在项目中运行 SQL 迁移脚本:
   - `migrations/001_create_pets_table.sql`
   - `migrations/002_create_applications_table.sql`
   - `migrations/003_create_favorites_table.sql`
   - `migrations/004_create_messages_table.sql`
   - `migrations/005_seed_data.sql` (可选,用于初始化测试数据)

3. 获取项目 URL 和 anon key:
   - 项目设置 → API
   - 复制 Project URL 和 anon public key

### 2. 配置环境变量

创建 `.env` 文件:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

### 3. 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

### 4. 部署到生产环境

#### Vercel 部署 (推荐)

1. 安装 Vercel CLI:
```bash
npm i -g vercel
```

2. 登录并部署:
```bash
vercel login
vercel
```

3. 配置环境变量在 Vercel Dashboard 中

#### Netlify 部署

1. 连接 GitHub 仓库
2. 在 Netlify 中配置构建命令: `npm run build`
3. 配置发布目录: `dist`
4. 在环境变量中添加 Supabase URL 和 Key

#### 静态托管部署

```bash
npm run build
# 将 dist/ 目录上传到任何静态托管服务
```

## 数据库备份

```bash
# 使用 Supabase CLI
npx supabase db dump -f backup.sql

# 恢复
npx supabase db reset --db-url "postgresql://..."
```

## 监控和日志

- Supabase Dashboard → Logs
- Vercel Dashboard → Functions Logs

## 安全建议

1. 启用 Row Level Security (RLS)
2. 使用 Supabase Auth 进行身份验证
3. 定期备份数据库
4. 监控 API 使用情况
5. 更新依赖包以修复安全漏洞

## 常见问题

### 数据库连接失败
- 检查 .env 文件配置
- 验证 Supabase 项目 URL 和 Key
- 检查 Supabase 项目状态

### CORS 错误
- 在 Supabase Dashboard 中配置允许的域名
- 确保 Vite 开发服务器端口正确

### 构建失败
- 清除 node_modules 和重新安装
- 检查 TypeScript 类型错误: `npm run type-check`
