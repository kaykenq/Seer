const Base = require('./Base.js')

module.exports = class AccumulatedStrcture {
  constructor(data) {
    this._0_5 = super.localeString(data.valorAcumuladoConcurso_0_5)
    this.special = super.localeString(data.valorAcumuladoEspecial)
    this.nextLottery = super.localeString(data.valorAcumuladoProximoConcurso)
  }
}