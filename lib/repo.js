'use strict'

const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec

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

exports.info = (base, repo, cb) => {
  const repoPath = path.join(base, repo)
  var info = {
    folder: repo
  }
  return Promise.all([
    getBranch(repoPath).then((branch) => { info.branch = branch })
  ]).then(() => info)
}

const getBranch = exports.getBranch = (path) => {
  return new Promise((resolve, reject) => {
    process.chdir(path)
    exec('git rev-parse --abbrev-ref HEAD', (err, stdout, stderr) => {
      if (err) {
        reject(err)
      } else {
        resolve(stdout.replace(/\n/, ''))
      }
    })
  })
}



