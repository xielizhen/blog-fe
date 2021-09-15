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
      {
        title: '调用堆栈',
        collapsable: true,
        sidebarDepth: 1,
        path: '/jsDepth/context',
        children: [
          {
            title: 'JavaScript深入之执行上下文栈',
            path: '/jsDepth/context/execOrder',
          },
          {
            title: 'JavaScript中的执行上下文和执行栈',
            path: '/jsDepth/context/execution',
          },
          {
            title: 'JavaScript深入之变量对象',
            path: '/jsDepth/context/vo'
          }
        ]
      },
      {
        title: '原型和原型链',
        collapsable: true,
        sidebarDepth: 1,
        path: '/jsDepth/prototype',
        children: [
          {
            title: '从原型到原型链',
            path: '/jsDepth/prototype/proto',
          },
          {
            title: '继承的多种方式以及优缺点',
            path: '/jsDepth/prototype/inherit'
          },
          {
            title: 'new的模拟实现',
            path: '/jsDepth/prototype/new'
          }
        ]
      },
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
          },
          {
            title: '数组原型方法',
            path: '/articles/arrayProto'
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