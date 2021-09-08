module.exports = {
  base: '/blog/',
  title: '谢丽珍的博客',
  description: '',
  themeConfig: {
    nav: [ 
      {text: '主页', link: '/'},
      {text: '文档', link: '/guide/'},
      {text: '交流', link: '/zyqq/wheel'},
    ],
    sidebar: [
      // {
      //   title: '更新动态',
      //   collapsable: true,
      //   sidebarDepth: 1,
      //   path: '/news',
      //   children: [
      //     {
      //       title: 'react18版',
      //       path: '/news/react_18',
      //       sidebarDepth: 2
      //     }
      //   ]
      // },
      {
        title: '零散思绪',
        collapsable: true,
        sidebarDepth: 1,
        path: '/articles',
        children: [
          {
            title: '前端渲染方案',
            path: '/articles/render'
          },
          {
            title: '模块化演进',
            path: '/articles/module'
          }  
        ]
      }
    ]
  },
  configureWebpack: {
    resolve: {
      alias: {
        'src': '../.vuepress',
        'imgs': '../.vuepress/public/imgs'
      }
    }
  }
}