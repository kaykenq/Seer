const Base = require('./Base.js')

module.exports = class InformationAboutLotteryStructures extends Base {
  constructor(data) {
    this.winningCities = data.listaMunicipioUFGanhadores
    this.informations = []
  }
  
  parse(data) {
    if('listaRateioPremio' in data) {
      const obj = {}
      data.listaRateioPremio.forEach(lottery => {
        obj.hits = lottery.descricaoFaixa.replace(' acertos', '')
        obj.track = lottery.faixa
        obj.winningNumbers = super.localeString(lottery.numeroDeGanhadores)
        obj.prize = super.localeString(lottery.valorPremio)
        this.informations.push(obj)
      })
    }
  }
}