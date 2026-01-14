# 快速设置指南

## 📋 前置准备

1. **Supabase 账户**
   - 访问 [https://supabase.com](https://supabase.com) 注册
   - 创建新项目

2. **Node.js 环境**
   - 确保已安装 Node.js 18+ 
   - 验证: `node --version`

## 🚀 设置步骤

### 步骤 1: 安装依赖

```bash
cd d:/IDE/tencent-codebuddy
npm install
```

### 步骤 2: 配置环境变量

已创建 `.env` 文件,包含以下配置:

```env
VITE_SUPABASE_URL=https://wvppsoypmmshnskajfso.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
GEMINI_API_KEY=your_gemini_api_key_here
```

⚠️ 注意: Supabase 凭证已配置,GEMINI_API_KEY 需要您替换为实际的 API Key。

### 步骤 3: 初始化数据库

#### 方法 A: 使用 Supabase Dashboard (推荐)

1. 访问您的 Supabase Dashboard
2. 进入 SQL Editor
3. 依次运行以下迁移文件:
   - `migrations/001_create_pets_table.sql`
   - `migrations/002_create_applications_table.sql`
   - `migrations/003_create_favorites_table.sql`
   - `migrations/004_create_messages_table.sql`
   - `migrations/005_seed_data.sql` (可选,添加测试数据)

#### 方法 B: 使用 Supabase CLI

```bash
# 安装 Supabase CLI
npm install -g supabase

# 登录
supabase login

# 链接到项目
supabase link --project-ref wvppsoypmmshnskajfso

# 推送数据库迁移
supabase db push
```

### 步骤 4: 验证数据库连接

```bash
node scripts/init-db.js
```

如果成功,您将看到:
```
✅ Database connection successful!
🐕 Pets table: 3 records
📝 Applications table: 1 records
...
```

### 步骤 5: 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:5173](http://localhost:5173)

## 📂 项目结构说明

```
pawpals-pet-adoption/
├── lib/supabase.ts           # Supabase 客户端配置
├── services/                 # API 服务层
│   ├── petService.ts         # 宠物相关 API
│   ├── applicationService.ts # 申请相关 API
│   ├── favoriteService.ts    # 收藏相关 API
│   └── messageService.ts    # 消息相关 API
├── hooks/                   # React Hooks
│   ├── usePets.ts
│   ├── useApplications.ts
│   ├── useFavorites.ts
│   └── useMessages.ts
├── components/              # 可复用组件
│   ├── ErrorBoundary.tsx    # 错误边界
│   ├── LoadingSpinner.tsx   # 加载状态
│   └── Toast.tsx           # 提示消息
├── pages/                  # 页面组件
└── migrations/             # 数据库迁移
```

## 🔧 API 使用示例

### 获取宠物列表
```typescript
import { usePets } from './hooks/usePets';

function PetList() {
  const { pets, loading, error } = usePets({ status: '待领养' });
  
  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;
  
  return (
    <div>
      {pets.map(pet => <PetCard key={pet.id} pet={pet} />)}
    </div>
  );
}
```

### 创建申请
```typescript
import { useApplications } from './hooks/useApplications';

function AdoptionForm() {
  const { createApplication } = useApplications('user@example.com');
  
  const handleSubmit = async (formData) => {
    const result = await createApplication(formData);
    if (result.success) {
      alert('申请提交成功!');
    }
  };
}
```

## 🐛 常见问题

### 问题 1: 数据库连接失败
**解决方案:**
- 检查 `.env` 文件中的 Supabase URL 和 Key
- 确认 Supabase 项目状态为 Active
- 运行 `node scripts/init-db.js` 验证连接

### 问题 2: 找不到表
**解决方案:**
- 确保已运行所有数据库迁移文件
- 在 Supabase Dashboard 检查表是否创建成功

### 问题 3: TypeScript 类型错误
**解决方案:**
```bash
npm run type-check
```

### 问题 4: 构建失败
**解决方案:**
```bash
# 清除缓存
rm -rf node_modules dist
npm install
npm run build
```

## 📚 更多文档

- **架构文档**: [ARCHITECTURE.md](ARCHITECTURE.md)
- **部署指南**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **项目 README**: [README-EN.md](README-EN.md)

## 🎯 下一步

1. ✅ 完成数据库初始化
2. ✅ 启动开发服务器
3. ✅ 测试应用功能
4. ✅ 根据需求自定义 UI
5. ✅ 部署到生产环境

## 💡 开发提示

- 使用 `npm run dev` 启动开发服务器
- 代码修改会自动热重载
- 使用 TypeScript 类型检查: `npm run type-check`
- 查看控制台日志排查问题

---

需要帮助? 查看 [Supabase 文档](https://supabase.com/docs) 或 [React 文档](https://react.dev).
