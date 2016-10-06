'use strict'

const clc = require('cli-color')
const clui = require('clui')
const Line = clui.Line

// @TODO text if collumns bigger than screen
// const columns = process.stdout.columns
var repoColumnSize = 20

exports.setRepoColumnSize = (size) => { repoColumnSize = size }

exports.title = new Line()
  .column('TURBOSTATUS', 20, [clc.yellowBright.bold])
  .fill()
  .output()

exports.repoLine = (info) => {
  new Line()
    .column(info.folder, repoColumnSize, [clc.blue])
    .column(info.branch, 20, [clc.green])
    .output()
}

