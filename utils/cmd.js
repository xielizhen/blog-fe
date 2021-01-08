const { spawn } = require('child_process')
const chalk = require('chalk')

function processCmdInTerminal(cmd, config) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, {
      shell: true,
      env: process.env,
      stdio: 'inherit',
      ...config
    })
    
    child.on('error', reject)
    child.on('exit', resolve)
  })
}

const logger = {
  set stdout(buffer) {
      process.stdout.write(buffer.toString(), 'utf8')
  },
  info: (message) => {
      logger.stdout = chalk.bold(message)
  },
  warn: (message) => {
      logger.stdout = chalk.black.bgYellow.bold(message)
  },
  success: (message) => {
      logger.stdout = chalk.black.bgGreen.bold(message)
  },
  error: (message) => {
      logger.stdout = chalk.black.bgRed.bold.strikethrough(message)
  }
}


module.exports = {
  processCmdInTerminal,
  logger
}

