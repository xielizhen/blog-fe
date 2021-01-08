const { spawn } = require('child_process')
const fs = require('fs')

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

function deleteAllFiles(filePath) {
  if (!fs.existsSync(filePath)) return
  try {
    const excludeFiles = ['.git', 'README.md']
    const files = fs.readdirSync(filePath).filter(
      o => !excludeFiles.map(f => f.toLowerCase()).includes(o.toLowerCase())
    )
	  files.forEach(file => {
	  	const curPath = `${filePath}/${file}`
	  	if(fs.statSync(curPath).isDirectory()) {
	  		deleteAllFiles(curPath)
	  	} else {
	  		fs.unlinkSync(curPath)
	  	}
	  })
  } catch (err) {
    throw new Error(err)
  }
}

function moveDistToBlog(originPath, destPath) {
  if (!fs.existsSync(originPath)) return
  if (!fs.existsSync(destPath)) {
    fs.mkdirSync(destPath)
  }
  try {
    const files = fs.readdirSync(originPath)
    files.forEach(file => {
      const curPath = `${originPath}/${file}`
      if (fs.statSync(curPath).isDirectory()) {
        moveDistToBlog(curPath, `${destPath}/${file}`)
      } else {
        fs.writeFileSync(`${destPath}/${file}`, fs.readFileSync(curPath, 'utf8', 'utf8'))
      }
    })
  } catch (err) {
    throw new Error(err)
  }
}


module.exports = {
  processCmdInTerminal,
  deleteAllFiles,
  moveDistToBlog
}

