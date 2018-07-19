'use strict'

const colors = require('colors/safe')
const Table = require('cli-table3')
const figures = require('figures')
const repeat = require('repeating')

const columns = process.stdout.columns
var nameColSize = 20 // default
const describeColSize = 25
var branchColSize = 15 // default
const statusColSize = 12

exports.setNameColSize = (size) => { nameColSize = size }
exports.setBranchColSize = (size) => { branchColSize = size }

function availableCols () {
  return columns - (6 + describeColSize + statusColSize)
}

exports.title = () => {
  console.log(colors.yellow.bold('TURBOSTATUS'))
}

exports.done = () => {
  console.log(colors.yellow.bold('done.'))
}

exports.infoRemotes = () => {
  console.log(colors.yellow.bold('-- Updating remotes'))
}

exports.repoLine = (info) => {
  var icon, status

  switch (info.status) {
    case 'uptodate':
      status = ''
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

  status = [
    status,
    info.uncommited ? colors.yellow('Uncommitted') : '',
    info.untracked ? colors.yellow('Untracked') : ''
  ].filter((i) => i).join(' ')

  const atTag = info.describe.nearestTag && parseInt(info.describe.commitsSinceTag) === 0
  const describe = [
    info.describe.nearestTag && atTag ? colors.white.bold(info.describe.nearestTag) : false,
    info.describe.nearestTag && !atTag ? colors.white(info.describe.nearestTag) : false,
    info.describe.commitsSinceTag && info.describe.commitsSinceTag > 0
      ? colors.white('(+' + info.describe.commitsSinceTag + ')') : false,
    colors.blue.bold(info.describe.hash)
  ].filter((item) => item).join(' ')

  const tempNameColSize = Math.min(nameColSize, Math.floor(availableCols() * 0.7))
  const tempBranchColSize = Math.min(branchColSize, Math.floor(availableCols() * 0.3))

  var table = new Table({
    colWidths: [
      2,
      tempNameColSize,
      describeColSize,
      tempBranchColSize,
      statusColSize
    ],
    wordWrap: true,
    chars: resetTableChars,
    style: { 'padding-left': 0, 'padding-right': 0 }
  })
  table.push([
    icon,
    colors.blue.bold(info.name),
    { hAlign: 'right', content: describe },
    colors.green.bold(info.branch.replace(/^HEAD$/, '')),
    { hAlign: 'right', content: colors.white.bold(status) }
  ])
  console.log(table.toString())
}

exports.progress = (total, current) => {
  const columns = process.stdout.columns
  let ratio = current / total
  ratio = Math.min(Math.max(ratio, 0), 1)
  let progress = `${current}/${total} `
  const width = Math.max(0, columns - progress.length - 1)
  const complete = Math.round(width * ratio)
  return progress + repeat(complete, '█') + repeat(width - complete, '░')
}

exports.checkoutConfirmLine = (item) => {
  let action
  switch (item.action) {
    case 'clone':
      action = `${colors.green.bold('Will be cloned')}`
      break
    case 'checkout':
      action = `${colors.yellow('Will checkout')} ${colors.yellow.bold(item.commit.substring(0, 7))}`
      break
    case 'upToDate':
      action = ''
      break
  }
  return ` ${colors.blue.bold(item.name)} ${action}`
}

const resetTableChars = { 'top': '', 'top-mid': '', 'top-left': '', 'top-right': '', 'bottom': '', 'bottom-mid': '', 'bottom-left': '', 'bottom-right': '', 'left': '', 'left-mid': '', 'mid': '', 'mid-mid': '', 'right': '', 'right-mid': '', 'middle': ' ' }
