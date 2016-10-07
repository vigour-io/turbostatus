'use strict'

const colors = require('colors/safe')
const Table = require('cli-table2')

// @TODO text if collumns bigger than screen
// const columns = process.stdout.columns
var nameColumnSize = 20

exports.setNameColumnSize = (size) => { nameColumnSize = size }

exports.title = () => {
  console.log(colors.yellow.bold('TURBOSTATUS'))
}

exports.repoLine = (info) => {
  var status = info.status
  status += (info.uncommited ? colors.yellow(' (Dirty)') : '')
  status += (info.untracked ? colors.yellow(' (Untracked files)') : '')

  var table = new Table({
    colWidths: [
      nameColumnSize,
      20,
      40
    ],
    wordWrap: true,
    chars: resetTableChars,
    style: { 'padding-left': 0, 'padding-right': 0 }
  })
  table.push([
    colors.blue.bold(info.folderName),
    colors.green.bold(info.branch),
    colors.white.bold(status)
  ])
  console.log(table.toString())
}

const resetTableChars = { 'top': '', 'top-mid': '', 'top-left': '', 'top-right': '', 'bottom': '', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': '', 'left': '', 'left-mid': '', 'mid': '', 'mid-mid': '', 'right': '', 'right-mid': '', 'middle': ' ' }
