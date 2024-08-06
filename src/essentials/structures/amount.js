const AccumulatedStructure = require("./accumulated.js");

module.exports = class AmountStructure {
  constructor(data) {
    this.accumulated = new AccumulatedStructure(data)
    this.collected = data.valorArrecadado.toLocaleString('.')
  }
}