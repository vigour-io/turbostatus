'use strict'

const colors = require('colors/safe')
const Table = require('cli-table2')
const figures = require('figures')

const columns = process.stdout.columns
var nameColSize = 20 // default. it's dynamic
const describeColSize = 25
const branchColSize = 15
const statusColSize = 15

exports.setNameColumnSize = (size) => {
  const otherCols = 8 + describeColSize + branchColSize + statusColSize
  nameColSize = Math.min(size, columns - otherCols)
}

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
      icon = colors.green.bold(figures.bullet)
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
      status = info.branch === 'HEAD' ? 'No remote' : '?'
      icon = ''
  }
  if (info.untracked || info.uncommited) icon = colors.red.bold(figures.bullet)

  status += (info.uncommited ? colors.yellow(' D') : '')
  status += (info.untracked ? colors.yellow(' U') : '')

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
      nameColSize,
      describeColSize,
      branchColSize,
      statusColSize
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
