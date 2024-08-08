// @ts-check
const { JSONFilePreset } = require('lowdb')
const path = require('node:path');

module.exports = class DataManager extends JSONFilePreset {
  constructor(file, pr) {
    super(path(__dirname, file), pr || { results: [], })
  }
}