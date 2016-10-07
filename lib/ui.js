'use strict'

const colors = require('colors/safe')
const Table = require('cli-table2')
const figures = require('figures')

// @TODO text if collumns bigger than screen
// const columns = process.stdout.columns
var nameColumnSize = 20

exports.setNameColumnSize = (size) => { nameColumnSize = size }

exports.title = () => {
  console.log(colors.yellow.bold('TURBOSTATUS'))
}

exports.infoRemotes = () => {
  console.log(colors.yellow.bold('-- Updating remotes'))
}

exports.repoLine = (info) => {
  var icon, status

  switch (info.status) {
    case 'uptodate':
      status = 'Up-to-date'
      icon = colors.green.bold(figures.pointer)
      break
    case 'pull':
      status = 'Need to pull'
      icon = colors.yellow.bold(figures.arrowDown)
      break
    case 'push':
      status = 'Need to push'
      icon = colors.yellow.bold(figures.arrowUp)
      break
    case 'diverged':
      status = 'Diverged'
      icon = colors.yellow.bold('!')
      break
    default:
      status = '?'
      icon = ''
  }

  status += (info.uncommited ? colors.yellow(' (Dirty)') : '')
  status += (info.untracked ? colors.yellow(' (Untracked files)') : '')

  const atTag = info.describe.nearestTag && parseInt(info.describe.commitsSinceTag) === 0
  const describe = [
    info.describe.nearestTag && atTag ? colors.white.bold(info.describe.nearestTag) : false,
    info.describe.nearestTag && !atTag ? colors.white(info.describe.nearestTag) : false,
    info.describe.commitsSinceTag && info.describe.commitsSinceTag > 0
      ? colors.white('(+' + info.describe.commitsSinceTag + ')') : false,
    colors.blue.bold(info.describe.hash)
  ].filter((item) => item).join(' ')

  var table = new Table({
    colWidths: [
      2,
      nameColumnSize,
      40,
      20,
      40
    ],
    wordWrap: true,
    chars: resetTableChars,
    style: { 'padding-left': 0, 'padding-right': 0 }
  })
  table.push([
    icon,
    colors.blue.bold(info.folderName),
    { hAlign: 'right', content: describe },
    colors.green.bold(info.branch),
    colors.white.bold(status)
  ])
  console.log(table.toString())
}

const resetTableChars = { 'top': '', 'top-mid': '', 'top-left': '', 'top-right': '', 'bottom': '', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': '', 'left': '', 'left-mid': '', 'mid': '', 'mid-mid': '', 'right': '', 'right-mid': '', 'middle': ' ' }
