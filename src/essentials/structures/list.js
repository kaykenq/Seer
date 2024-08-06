const InformationAboutLottertStructures = require('./information.js');

module.exports = class ListStructure {
  constructor(data) {
    this.winningNumbers = data.dezenasSorteadasOrdemSorteio.sort()
    this.lotteryInformation = new InformationAboutLottertStructures(data)
  }
}