'use strict'

const app = require('commander')
const pkg = require('../package.json')
const walk = require('./walk')
const ui = require('./ui')

app
  .version(pkg.version)
  .option('-r, --remote', 'Check remotes (slow)')
  .option('-p, --path [path]', 'Path to check for repos')
  .parse(process.argv)

ui.title()
walk(app.path)

