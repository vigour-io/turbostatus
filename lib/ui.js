'use strict'

const clc = require('cli-color')
const clui = require('clui')
const Line = clui.Line

// @TODO text if collumns bigger than screen
// const columns = process.stdout.columns
var nameColumnSize = 20

exports.setNameColumnSize = (size) => { nameColumnSize = size }

exports.title = new Line()
  .column('TURBOSTATUS', 20, [clc.yellowBright.bold])
  .fill()
  .output()

exports.repoLine = (info) => {
  new Line()
    .column(info.folderName, nameColumnSize, [clc.blue])
    .column(info.branch, 20, [clc.green])
    .output()
}

