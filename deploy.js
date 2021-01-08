const { processCmdInTerminal, logger } = require('./utils/cmd')
const args = process.argv.splice(2)

const commitInfo = args[0]
const branch = args[1] || 'master'
if (!commitInfo) {
  logger.error('git commit必须输入msg')
}


const cmd = `
  # push源文件
  git add .
  git commit -m 'test: 测试一下'
  git push origin ${branch}

  # docs打包
  yarn build

  # 文件操作
  node ./utils/moveDist.js
  cd ../blog

  # 提交dist中的文件
  git add .
  git commit -m ''
  git push origin ${branch}
`

processCmdInTerminal(cmd).then(res => {
  console.log(res)
}).catch(err => {
  logger.error(err.message)
})