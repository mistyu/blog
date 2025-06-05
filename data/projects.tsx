export const projects: Project[] = [
  {
    title: 'POS点单系统',
    description: '基于Flutter实现的餐饮点餐系统，可以点单、收银、会员充值、订单明细、库存等功能',
    preview: '/img/project/pos-home.jpg',
    website: '/pos',
    tags: ['large', 'product', 'favorite'],
    type: 'commerce',
  },
  {
    title: '万能水印相机',
    description: '基于 Flutter 实现的水印打卡App',
    preview: '/img/project/watermask.jpg',
    website: '/watermask',
    source: 'https://github.com/mistyu/watermark',
    tags: ['large', 'product', 'favorite'],
    type: 'commerce',
  },
  {
    title: 'IM通讯',
    description: '基于 Flutter 实现的通讯平台，支持视频、语言、好友、群聊、表情包等功能',
    preview: '/img/project/im1.jpg',
    website: '/im',
    tags: ['product', 'favorite'],
    type: 'commerce',
  },
  {
    title: '易媒助手',
    description: '基于 Electron + FFmpeg 实现的视频处理工具，支持视频转码、剪辑、合并等功能',
    preview: '/img/project/electron-media.jpg',
    website: 'https://github.com/mistyu/media-assistant',
    source: 'https://github.com/mistyu/media-assistant',
    tags: ['product', 'favorite'],
    type: 'commerce',
  },
  {
    title: '一月的小站',
    description: '🦖 基于 Docusaurus 静态网站生成器实现个人博客',
    preview: '/img/project/blog.png',
    website: 'https://mistyu.com',
    source: 'https://github.com/mistyu/blog',
    tags: ['opensource', 'design', 'favorite'],
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
  // toy
  {
    title: 'go-blog-server',
    description: 'go语言编写的博客服务端，支持文章、分类、标签、评论等功能',
    preview: '/img/project/go-blog-server.jpg',
    website: 'https://github.com/mistyu/blog-server',
    source: 'https://github.com/mistyu/blog-server',
    tags: ['opensource', 'favorite'],
    type: 'toy',
  },
  {
    title: '微前端',
    description: '🌱 一个基于qiankun的微前端demo',
    preview: '/img/project/qiankun-micro.jpg',
    website: 'https://github.com/mistyu/micro-app',
    source: 'https://github.com/mistyu/micro-app',
    tags: ['opensource', 'personal'],
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
    title: 'Vue低代码',
    description: '📦 Vue3实现的低代码，适合用于活动页、报表等项目',
    preview: '/img/project/lowcode-vue.jpg',
    website: 'https://github.com/mistyu/lowcode',
    source: 'https://github.com/mistyu/lowcode',
    tags: ['opensource', 'design'],
    type: 'personal',
  },
  {
    title: 'Vue组件库',
    description: '📦 基于Vue3 + Element-Plus 实现的业务组件库',
    preview: '/img/project/vue3-ui.jpg',
    website: 'https://github.com/mistyu/mistyu-ui',
    source: 'https://github.com/mistyu/mistyu-ui',
    tags: ['opensource', 'design'],
    type: 'personal',
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
  toy: '📖 学习',
  other: '🔧 工具',
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
