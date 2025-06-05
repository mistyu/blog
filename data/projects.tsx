export const projects: Project[] = [
  {
    title: '一月的小站',
    description: '🦖 基于 Docusaurus 静态网站生成器实现个人博客',
    preview: '/img/project/blog.png',
    website: 'https://mistyu.com',
    source: 'https://github.com/mistyu/blog',
    tags: ['opensource', 'design', 'favorite'],
    type: 'web',
  },
  {
    title: 'POS点单系统',
    description: '基于Flutter实现的餐饮点餐系统，可以点单、收银、会员充值、订单明细、库存等功能',
    preview: '/img/project/pos-home.jpg',
    website: '/pos',
    tags: ['large', 'product', 'favorite'],
    type: 'web',
  },
  {
    title: 'Youni（校园社交平台）',
    description: '基于 React Native + NestJs 实现的一个校园社交平台应用',
    preview: '/img/project/youni.png',
    website: 'https://youni.vercel.app',
    source: 'https://github.com/yiyue/youni',
    tags: ['large', 'product', 'favorite'],
    type: 'web',
  },
  {
    title: 'nest-vben-admin',
    description: ' NestJs + Vben Admin 编写的一款前后端分离的权限管理系统',
    preview: '/img/project/nest-vben-admin.png',
    website: 'https://admin.yiyue.me',
    source: 'https://github.com/yiyue/nest-vben-admin',
    tags: ['opensource', 'favorite', 'product', 'large'],
    type: 'web',
  },
  {
    title: 'api-server',
    description: '🔗 基于 Nuxt 搭建的 API 接口服务网站',
    preview: '/img/project/kz-api.png',
    website: 'https://api.yiyue.me',
    source: 'https://github.com/yiyue/api-service',
    tags: ['opensource', 'favorite', 'product'],
    type: 'web',
  },
  // toy
  {
    title: 'chaoxing-sign',
    description: '🌟 超星学习通在线签到，摆脱客户端繁琐的签到流程，让签到不再是你的烦恼',
    preview: '/img/project/chaoxing-sign.png',
    website: 'https://cx.yiyue.me',
    source: 'https://github.com/yiyue/chaoxing-sign',
    tags: ['opensource', 'favorite'],
    type: 'toy',
  },
  {
    title: '便民服务',
    description: '🌱 一个便民服务的网站',
    preview: '/img/project/service.png',
    website: 'https://service.yiyue.me',
    source: 'https://github.com/yiyue/service',
    tags: ['opensource', 'personal'],
    type: 'toy',
  },
  {
    title: 'Hoppx',
    description: '👽 仿 Hoppscotch 风格的网站模板',
    preview: '/img/project/hoppx.png',
    website: 'https://hoppx.vercel.app',
    source: 'https://github.com/yiyue/hoppx',
    tags: ['opensource'],
    type: 'toy',
  },
  {
    title: 'Link Maker',
    description: '🍋 一个用于将链接转换为卡片样式的预览网站',
    preview: '/img/project/link-maker.png',
    website: 'https://link-maker.deno.dev',
    source: 'https://github.com/yiyue/link-maker',
    tags: ['opensource'],
    type: 'toy',
  },
  {
    title: 'Nuxt-Naive-Admin',
    description: '🎁 一站式管理系统，融合 Nuxt、Naive UI 和 Supabase',
    preview: '/img/project/nuxt-naive-admin.png',
    website: 'https://nuxt-naive-admin.vercel.app',
    source: 'https://github.com/yiyue/nuxt-naive-admin',
    tags: ['opensource'],
    type: 'toy',
  },
  // personal
  {
    title: 'interview',
    description: '📚 整理前端面试题和答案，帮助你更好地准备面试',
    website: 'git@github.com:mistyu/interview.git',
    preview: '/img/project/interview.png',
    source: 'https://github.com/yiyue/vscode-extension',
    tags: ['opensource'],
    type: 'personal',
  },
  {
    title: '前端示例代码库',
    description: '📦 整理前端样式和功能的实现代码，可以用来寻找灵感或直接使用示例中的代码',
    preview: '/img/project/example-website.png',
    website: 'https://example.yiyue.me',
    source: 'https://github.com/yiyue/example',
    tags: ['opensource', 'design'],
    type: 'personal',
  },
  {
    title: '@yiyue/http',
    description: '基于 Axios 封装的 HTTP 类库',
    website: 'https://www.npmjs.com/package/@yiyue/http',
    tags: ['opensource', 'personal'],
    type: 'other',
  },
  {
    title: 'auto-insert-assets-to-html',
    description: 'Webpack 打包时，自动插入CDN链接到HTML',
    website: 'https://github.com/mistyu/auto-insert-assets-to-html',
    tags: ['opensource'],
    type: 'other',
  },
]

export type Tag = {
  label: string
  description: string
  color: string
}

export type TagType = 'favorite' | 'opensource' | 'product' | 'design' | 'large' | 'personal'

export type ProjectType = 'web' | 'app' | 'commerce' | 'personal' | 'toy' | 'other'

export const projectTypeMap = {
  web: '🖥️ 网站',
  app: '💫 应用',
  commerce: '商业项目',
  personal: '👨‍💻 个人',
  toy: '🔫 玩具',
  other: '🗃️ 其他',
}

export type Project = {
  title: string
  description: string
  preview?: string
  website: string
  source?: string | null
  tags: TagType[]
  type: ProjectType
}

export const Tags: Record<TagType, Tag> = {
  favorite: {
    label: '喜爱',
    description: '我最喜欢的网站，一定要去看看!',
    color: '#e9669e',
  },
  opensource: {
    label: '开源',
    description: '开源项目可以提供灵感!',
    color: '#39ca30',
  },
  product: {
    label: '产品',
    description: '与产品相关的项目!',
    color: '#dfd545',
  },
  design: {
    label: '设计',
    description: '设计漂亮的网站!',
    color: '#a44fb7',
  },
  large: {
    label: '大型',
    description: '大型项目，原多于平均数的页面',
    color: '#8c2f00',
  },
  personal: {
    label: '个人',
    description: '个人项目',
    color: '#12affa',
  },
}

export const TagList = Object.keys(Tags) as TagType[]

export const groupByProjects = projects.reduce(
  (group, project) => {
    const { type } = project
    group[type] = group[type] ?? []
    group[type].push(project)
    return group
  },
  {} as Record<ProjectType, Project[]>,
)
