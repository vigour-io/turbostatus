'use strict'

const repo = require('./repo')
const ui = require('./ui')
const path = require('path')

var baseFolder

module.exports = function walkFolder (folder = process.cwd()) {
  baseFolder = folder
  repo.getAll(baseFolder)
    .then((folderNames) => {
      ui.setNameColumnSize(sizeOfLargestName(folderNames))
      return showInfoInSequence(folderNames)
    })
    .catch((err) => {
      console.log('Opps error: ', err)
    })
}

function showInfoInSequence (folderNames) {
  var sequence = Promise.resolve()
  folderNames.forEach((folder) => {
    sequence = sequence.then(() => {
      return repo.info(path.join(baseFolder, folder))
    }).then((info) => {
      ui.repoLine(info)
    })
  })
  return sequence
}

function sizeOfLargestName (folderNames) {
  return folderNames
          .reduce((a, b) => a.length > b.length ? a : b)
          .length + 2 // padding
}
