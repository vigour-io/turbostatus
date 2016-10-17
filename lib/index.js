'use strict'

const fs = require('fs')
const exec = require('child_process').exec
const path = require('path')
const minimatch = require('minimatch')
// @TODO move Ora to ui
const ora = require('ora')
const colors = require('colors/safe')
var spinner

exports.getRepos = (folder, wildcard = '*') => Promise.resolve(
  fs.readdirSync(folder)
    .filter((item) => fs.statSync(path.join(folder, item)).isDirectory() && isRepo(item))
    .filter((item) => minimatch(item, wildcard))
    .map((item) => {
      return {
        name: item,
        path: path.join(folder, item)
      }
    })
)

const isRepo = exports.isRepo = (folder) => {
  try {
    return fs.statSync(path.join(folder, '.git')).isDirectory()
  } catch (e) {
    return false
  }
}

exports.info = (repo, remotes) => {
  return Promise.resolve().then(() => {
    if (remotes) {
      spinner = ora(colors.blue.bold(' ' + repo.name)).start()
      return updateRemotes(repo.path).then(() => {
        spinner.stop()
      }).catch((err) => {
        if (err) {
          spinner.stop()
          repo.status = 'Repo not found'
        }
      })
    } else {
      return true
    }
  }).then(() => Promise.all([
    getBranch(repo.path).then((branch) => { repo.branch = branch }),
    remoteComparison(repo.path).then((status) => { repo.status = repo.status ? repo.status + status : status }),
    hasUncommited(repo.path).then((result) => { repo.uncommited = result }),
    hasUntracked(repo.path).then((result) => { repo.untracked = result }),
    describe(repo.path).then((result) => { repo.describe = result })
  ]).then(() => repo))
}

exports.getBranchFast = (folder) => new Promise((resolve, reject) => {
  fs.readFile(path.join(folder, '.git', 'HEAD'), 'utf8', (err, data) => {
    if (err) {
      reject(err)
    }
    const match = /^ref: refs\/heads\/(.*)[\n\r]?$/.exec(data)
    resolve(match ? match[1] : '')
  })
})

const getBranch = (folder) => new Promise((resolve, reject) => {
  process.chdir(folder)
  exec('git rev-parse --abbrev-ref @', (err, stdout, stderr) => {
    if (err) {
      reject(err)
    } else {
      resolve(stdout.replace(/\n/, ''))
    }
  })
})

const getLocalCommit = (folder) => new Promise((resolve, reject) => {
  process.chdir(folder)
  exec('git rev-parse @', (err, stdout, stderr) => {
    if (err) {
      reject(err)
    } else {
      resolve(stdout.replace(/\n/, ''))
    }
  })
})

const getRemoteCommit = (folder) => new Promise((resolve, reject) => {
  process.chdir(folder)
  exec('git rev-parse @{u}', (err, stdout, stderr) => {
    if (err) {
      reject(err)
    } else {
      resolve(stdout.replace(/\n/, ''))
    }
  })
})

const getMergeBase = (folder) => new Promise((resolve, reject) => {
  process.chdir(folder)
  exec('git merge-base @ @{u}', (err, stdout, stderr) => {
    if (err) {
      reject(err)
    } else {
      resolve(stdout.replace(/\n/, ''))
    }
  })
})

const remoteComparison = (folder) => {
  var local, remote, base
  return Promise.all([
    getLocalCommit(folder).then((commit) => {
      local = commit
    }),
    getRemoteCommit(folder).then((commit) => {
      remote = commit
    }),
    getMergeBase(folder).then((commit) => {
      base = commit
    })
  ]).then(() => {
    if (local === remote) {
      return 'uptodate'
    } else if (local === base) {
      return 'pull'
    } else if (remote === base) {
      return 'push'
    } else {
      return 'diverged'
    }
  }).catch(() => '--')
}

const hasUncommited = (folder) => new Promise((resolve, reject) => {
  process.chdir(folder)
  exec('git diff --shortstat 2> /dev/null | tail -n1', (err, stdout, stderr) => {
    if (err) {
      reject(err)
    } else {
      resolve(stdout !== '')
    }
  })
})

const hasUntracked = (folder) => new Promise((resolve, reject) => {
  process.chdir(folder)
  exec('git status --porcelain 2>/dev/null | grep "^??" | wc -l', (err, stdout, stderr) => {
    if (err) {
      reject(err)
    } else {
      resolve(stdout > 0)
    }
  })
})

const describe = (folder) => new Promise((resolve, reject) => {
  process.chdir(folder)
  exec('git describe --long --always', (err, stdout, stderr) => {
    if (err) {
      reject(err)
    } else {
      const re = /(.+)-(\d+)-g(.*)|(.*)/
      const match = re.exec(stdout.replace(/\n/, ''))
      resolve({
        nearestTag: match[1] || false,
        commitsSinceTag: match[2] || false,
        hash: match[3] || match[4] || '?'
      })
    }
  })
})

const updateRemotes = (folder) => new Promise((resolve, reject) => {
  process.chdir(folder)
  exec('git remote update', (err, stdout, stderr) => {
    if (err) {
      reject(err)
    } else {
      resolve()
    }
  })
})
