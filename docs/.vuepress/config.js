const moment = require('moment');
module.exports = {
   title: "肥小猪",
   description: "肥小猪的笔记",
   base: "/VuePress/",
	head: [
		['link', { rel: 'icon', href: '/favicon.ico' }],
		['meta', { name: 'author', content: 'zhuangjie' }],
		['meta', { name: 'keywords', content: '小庄的博客 小庄的笔记 zhuangjie 庄杰' }]
		
	],
	
  themeConfig: {
	lastUpdated: "更新时间",
    logo: '/assets/img/logo.png',
	nav: [
      { text: 'Js', link: '/note/大前端/Javascrit/Javascrit.html' },
      { text: 'spring', link: '/note/ssm/Spring/Spring.md' },
      { text: 'K8S', link: 'https://google.com' },
    ],
	sidebar: 'auto'
	
  },
  plugins: [
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          // 不要忘了安装 moment  官网：http://momentjs.cn/
          const moment = require('moment')
          moment.locale('zh-cn')
          return moment(timestamp).format("LLLL")
        }
      }
    ]
  ]
}