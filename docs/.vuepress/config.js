module.exports = {
  base: '/blog',
  title: '谢丽珍的博客',
  description: '',
  themeConfig: {
    nav: [ 
      {text: '主页', link: '/'},
      {text: '文档', link: '/guide/'},
      {text: '交流', link: '/zyqq/wheel'},
    ],
    sidebar: [
      {
        title: 'Webpack',
        path: '/webpack',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          {
            title: '手把手撸loader',
            path: '/webpack/loader',
            sidebarDepth: 2
          }
        ]
      }
    ]
  },
  configureWebpack: {
    resolve: {
      alias: {
        'src': '../.vuepress'
      }
    }
  }
}