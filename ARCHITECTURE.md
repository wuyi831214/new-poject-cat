# 系统架构文档

## 技术栈

### 前端
- **React 19** - UI 框架
- **TypeScript 5.8** - 类型安全
- **Vite 6.2** - 构建工具
- **Tailwind CSS** - 样式框架

### 后端/数据库
- **Supabase** - BaaS 平台 (基于 PostgreSQL)
- **@supabase/supabase-js** - Supabase 客户端库

### AI 服务
- **Google Generative AI** - AI 对话功能

## 项目结构

```
pawpals-pet-adoption/
├── components/          # 可复用组件
│   ├── ErrorBoundary.tsx
│   ├── LoadingSpinner.tsx
│   └── Toast.tsx
├── hooks/              # 自定义 React Hooks
│   ├── usePets.ts
│   ├── useApplications.ts
│   ├── useFavorites.ts
│   └── useMessages.ts
├── services/           # API 服务层
│   ├── petService.ts
│   ├── applicationService.ts
│   ├── favoriteService.ts
│   └── messageService.ts
├── pages/              # 页面组件
│   ├── Home.tsx
│   ├── PetDetails.tsx
│   ├── AdoptionForm.tsx
│   ├── Profile.tsx
│   ├── AIChat.tsx
│   ├── Discovery.tsx
│   └── Messages.tsx
├── lib/                # 工具库
│   └── supabase.ts
├── migrations/         # 数据库迁移
│   ├── 001_create_pets_table.sql
│   ├── 002_create_applications_table.sql
│   ├── 003_create_favorites_table.sql
│   ├── 004_create_messages_table.sql
│   └── 005_seed_data.sql
├── types-extended.ts   # 扩展类型定义
├── App.tsx            # 主应用组件
├── index.tsx          # 应用入口
├── .env               # 环境变量
└── package.json       # 依赖配置
```

## 数据模型

### pets (宠物表)
```typescript
{
  id: UUID
  name: string
  breed: string
  age: string
  gender: '公' | '母'
  weight: string
  distance: string
  location: string
  image: string
  tags: string[]
  description: string
  status: '待领养' | '审核中' | '已通过'
  price: number
  created_at: timestamp
  updated_at: timestamp
}
```

### applications (申请表)
```typescript
{
  id: UUID
  pet_id: UUID (FK)
  user_name: string
  user_email: string
  user_phone: string
  house_type: string
  ownership_type: string
  experience: string
  reason: text
  status: '审核中' | '已通过' | '已完成' | '已拒绝'
  created_at: timestamp
  updated_at: timestamp
}
```

### favorites (收藏表)
```typescript
{
  id: UUID
  user_id: string
  pet_id: UUID (FK)
  created_at: timestamp
  UNIQUE(user_id, pet_id)
}
```

### messages (消息表)
```typescript
{
  id: UUID
  user_id: string
  content: text
  role: 'user' | 'assistant'
  created_at: timestamp
}
```

## API 服务层

### PetService
- `getAllPets(filters)` - 获取宠物列表
- `getPetById(id)` - 获取单个宠物
- `createPet(pet)` - 创建宠物
- `updatePet(id, updates)` - 更新宠物
- `deletePet(id)` - 删除宠物
- `getRecommendedPets(limit)` - 获取推荐宠物
- `searchPets(query)` - 搜索宠物

### ApplicationService
- `getAllApplications(filters)` - 获取申请列表
- `getApplicationById(id)` - 获取单个申请
- `createApplication(formData)` - 创建申请
- `updateApplicationStatus(id, status)` - 更新状态
- `deleteApplication(id)` - 删除申请

### FavoriteService
- `getUserFavorites(userId)` - 获取用户收藏
- `addFavorite(userId, petId)` - 添加收藏
- `removeFavorite(userId, petId)` - 移除收藏
- `isFavorite(userId, petId)` - 检查收藏状态
- `toggleFavorite(userId, petId)` - 切换收藏

### MessageService
- `getUserMessages(userId)` - 获取用户消息
- `sendUserMessage(userId, content)` - 发送用户消息
- `sendAssistantMessage(userId, content)` - 发送助手消息
- `deleteMessage(id)` - 删除消息
- `clearUserMessages(userId)` - 清空消息

## 前端状态管理

使用 React Hooks + Context 模式:

- `usePets` - 宠物数据获取
- `useApplications` - 申请数据管理
- `useFavorites` - 收藏数据管理
- `useMessages` - 消息数据管理
- `useToast` - 提示消息管理

## 错误处理

1. **API 层错误处理**
   - 统一的错误响应格式
   - 详细的错误日志

2. **UI 层错误处理**
   - ErrorBoundary 组件捕获 React 错误
   - Toast 组件显示用户友好错误信息
   - LoadingSpinner 显示加载状态

## 性能优化

1. **代码分割** - React.lazy + Suspense
2. **图片优化** - 使用 CDN 和懒加载
3. **数据缓存** - React Query 或 SWR
4. **虚拟滚动** - 长列表优化

## 安全考虑

1. **Row Level Security (RLS)** - 数据库层权限控制
2. **输入验证** - 前后端双重验证
3. **XSS 防护** - React 自动转义
4. **环境变量** - 敏感信息不在代码中

## 扩展性

1. **模块化设计** - 易于添加新功能
2. **类型安全** - TypeScript 保证代码质量
3. **服务层抽象** - 易于切换后端实现
4. **组件复用** - 提高开发效率
