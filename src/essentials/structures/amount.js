const AccumulatedStructure = require("./accumulated.js");
const Base = require('./Base.js');

module.exports = class AmountStructure extends Base {
  constructor(data) {
    this.accumulated = new AccumulatedStructure(data)
    this.collected = super.localeString(data.valorArrecadado)
  }
}