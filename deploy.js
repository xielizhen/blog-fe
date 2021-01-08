const { processCmdInTerminal } = require('./utils/cmd')
const args = process.argv.splice(2)

const cmd = `
  # push源文件
  git add .
  git commit -m 'test: 测试一下'
  git push origin

  # docs打包
  yarn build

  # 文件操作
  node ./utils/moveDist.js
  cd ../blog

  # 提交dist中的文件
  git add .
  git commit -m 'update'
  git push origin
`

processCmdInTerminal(cmd).then(res => {
  console.log(res)
}).catch(err => {
  console.error(err)
})