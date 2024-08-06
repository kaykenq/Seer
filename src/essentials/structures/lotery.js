const AmountStructure = require('./amount.js');
const ListStructure = require('./list.js');

module.exports = class StructureData {
  constructor(data) {
    this.id = data.numero
    this._id = data.id
    this.location = { name: data.localSorteio, city: data.nomeMunicipioUFSorteio }
    this.type = data.tipoJogo
    this.obs = data.observacao
    this.publicationType = data.tipoPublicacao
    this.winningNumbers = data.listaDezenas
    this.parse(data)
  }
  
  parse(data) {
    if('valorArrecadado' in data) {
      this.amount = new AmountStructure(data)
    }
    
    if('listaDezenas' in data) {
      this.list = new ListStructure(data)
    }
  }
}