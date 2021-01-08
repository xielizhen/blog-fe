const { deleteAllFiles, moveDistToBlog } = require('./cmd')
const path = require('path')

const dist = path.resolve(process.cwd(), 'docs/.vuepress/dist')
const blog = path.resolve(process.cwd(), '../blog')

// 删除blog中的文件
deleteAllFiles(blog)

// 复制dist中的文件到blog中
moveDistToBlog(dist, blog)
