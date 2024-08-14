const Request = require("../essentials/HTTP.js");
const CacheManager = require("../essentials/managers/CacheManager.js");
const DataManager = require("../essentials/managers/DataManager.js");
const InitializeClusters = require("../essentials/functions/process.js");
const Save = require('./save.js');

// ta feio para caralho

module.exports = class Downloader extends Request {
  constructor(options) {
    super(options)
    
    this.cache = new CacheManager()
    this.db = new DataManager("../storage/datas_lottery.json", { games: [] })
  }
  
  async get_from_specific_id(id) {
    const r = await super.make({ resource: id })
    
    this.cache.set(id, r)
    return Save.ids(this.cache, this.db)
  }
  
  async get_all_ids_range(startIndex, endIndex) {
    const results = []
    
    for(let i = startIndex; i <= endIndex; i++) {
      results.push(this.get_from_specific_id(i).winningNumbers)
    }
    
    Promise.all(ids)
  }
  
  async _start() {
    const total = (await super.make()).id
    
    InitializeClusters(total, this.get_all_ids_range)
  }
}