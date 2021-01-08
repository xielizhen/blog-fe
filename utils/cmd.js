const { spawn } = require('child_process')

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

module.exports = {
  processCmdInTerminal
}

