const Request = require("../essentials/HTTP.js");
const CacheManager = require("../essentials/managers/CacheManager.js");

module.exports = class Downloader extends Request {
  constructor(options) {
    super(options)
    
    this.cache = new CacheManager()
  }
  
  async get_from_specific_id(id) {
    const r = await make({ resource: id })
    
    return this.cache.set(id, r)
  }
}