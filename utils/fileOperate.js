const fs = require('fs')

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

function moveAllFiles(originPath, destPath) {
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
  deleteAllFiles,
  moveAllFiles
}