module.exports = class AccumulatedStrcture {
  constructor(data) {
    this._0_5 = data.valorAcumuladoConcurso_0_5.toLocaleString('.')
    this.special = data.valorAcumuladoEspecial.toLocaleString('.')
    this.nextLottery = data.valorAcumuladoProximoConcurso.toLocaleString('.')
  }
}