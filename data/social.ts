export type Social = {
  github?: string
  juejin?: string
  // qq?: string
  wx?: string
  email?: string
}

type SocialValue = {
  href?: string
  title: string
  icon: string
  color: string
}

const social: Social = {
  github: 'https://github.com/mistyu',
  juejin: 'https://juejin.cn/user/3940246036691127',
  wx: 'https://mistyu.com/imgs/wechat.png',
  // qq: 'https://img.kuizuo.me/qq.png',
  // zhihu: 'https://www.zhihu.com/people/kuizuo',
  email: 'mailto:lichenhui821@qq.com',
}

const socialSet: Record<keyof Social, SocialValue> = {
  github: {
    href: social.github,
    title: 'GitHub',
    icon: 'ri:github-line',
    color: '#010409',
  },
  juejin: {
    href: social.juejin,
    title: '掘金',
    icon: 'simple-icons:juejin',
    color: '#1E81FF',
  },
  wx: {
    href: social.wx,
    title: '微信',
    icon: 'ri:wechat-2-line',
    color: '#07c160',
  },
  // qq: {
  //   href: social.qq,
  //   title: 'QQ',
  //   icon: 'ri:qq-line',
  //   color: '#1296db',
  // },
  email: {
    href: social.email,
    title: '邮箱',
    icon: 'ri:mail-line',
    color: '#D44638',
  },
  // cloudmusic: {
  //   href: social.cloudmusic,
  //   title: '网易云',
  //   icon: 'ri:netease-cloud-music-line',
  //   color: '#C20C0C',
  // },
}

export default socialSet
