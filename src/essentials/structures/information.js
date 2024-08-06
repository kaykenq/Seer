module.exports = class InformationAboutLotteryStructures {
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
        obj.winningNumbers = lottery.numeroDeGanhadores.toLocaleString('.')
        obj.prize = lottery.valorPremio.toLocaleString('.')
        this.informations.push(obj)
      })
    }
  }
}