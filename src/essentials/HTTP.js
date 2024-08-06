const axios = require("axios")
const LotteryStructures = require("./structures/lotery.js");
const { default_uri } = require('../utils/routes.json');

module.exports = class Request {
  async __result__(res) {
    return (new LotteryStructures((await res).data))
  }
  
  async make(options) {
    if(!options.url) options.url = default_uri
    if(options.resource) options.url+=options.resource
    const res = axios(options)
    return await this.__result__(res)
  }
}