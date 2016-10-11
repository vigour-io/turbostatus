'use strict'

const app = require('commander')
const pkg = require('../package.json')
const walk = require('./walk')
const ui = require('./ui')
const updateNotifier = require('update-notifier')
const notifier = updateNotifier({ pkg })

app
  .version(pkg.version)
  .option('-r, --remotes', 'Check remotes (slow)')
  .option('-p, --path [path]', 'Path to check for repos')
  .parse(process.argv)

ui.title()

if (app.remotes) ui.infoRemotes()
walk(app.path, app.remotes).then(() => {
  ui.done()
  notifier.notify()
}).catch((err) => { console.log(err) })

