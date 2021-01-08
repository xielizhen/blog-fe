module.exports = {
  base: '/blog',
  title: 'hello vuepress',
  description: 'just playing around',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  configureWebpack: {
    resolve: {
      alias: {
        'src': '../.vuepress'
      }
    }
  }
}