'use strict'

const fs = require('fs')
const exec = require('child_process').exec
const path = require('path')

exports.getAll = (folder) => Promise.resolve(
  fs.readdirSync(folder)
    .filter((item) => fs.statSync(path.join(folder, item)).isDirectory() && isRepo(item))
)

const isRepo = exports.isRepo = (folder) => {
  try {
    return fs.statSync(path.join(folder, '.git')).isDirectory()
  } catch (e) {
    return false
  }
}

exports.info = (folder) => {
  var info = { folderName: folder.match(/([^\/]*)\/*$/)[1] }
  return Promise.all([
    getBranch(folder).then((branch) => { info.branch = branch })
  ]).then(() => info)
}

const getBranch = exports.getBranch = (folder) => {
  return new Promise((resolve, reject) => {
    process.chdir(folder)
    exec('git rev-parse --abbrev-ref HEAD', (err, stdout, stderr) => {
      if (err) {
        reject(err)
      } else {
        resolve(stdout.replace(/\n/, ''))
      }
    })
  })
}

