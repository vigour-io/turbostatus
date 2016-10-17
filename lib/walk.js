'use strict'

const repo = require('./repo')
const ui = require('./ui')

var baseFolder

module.exports = function walkFolder (folder = process.cwd(), remotes, wildcard) {
  baseFolder = folder
  return repo.getAll(baseFolder, wildcard)
    .then((repos) => {
      return addBranchInfo(repos)
    }).then((repos) => {
      ui.setNameColSize(propertyLargestLength('name', repos))
      ui.setBranchColSize(propertyLargestLength('branch', repos))
      return showInfoInSequence(repos, remotes)
    }).catch((err) => {
      console.log('Opps error: ', err)
    })
}

function showInfoInSequence (repos, remotes) {
  var sequence = Promise.resolve()
  repos.forEach((item) => {
    sequence = sequence.then(() => {
      return repo.info(item, remotes)
    }).then((info) => {
      ui.repoLine(info)
    })
  })
  return sequence
}

function propertyLargestLength (property, repos) {
  if (repos.length < 1) return void 0
  const largest = repos
          .reduce((a, b) => a[property].length > b[property].length ? a : b)
  return largest[property].length + 2 // padding
}

function addBranchInfo (repos) {
  return Promise.all(repos.map((item) => {
    return repo.getBranchFast(item.path).then((branch) => {
      item.branch = branch
      return item
    }).catch((err) => console.log('Error getting branch', err))
  }))
}
