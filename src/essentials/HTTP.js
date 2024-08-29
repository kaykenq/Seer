const axios = require("axios")
const LotteryStructures = require("./structures/lotery.js");
const { default_uri } = require('../utils/routes.json');

module.exports = class Request {
  __result__(res) {
    return (new LotteryStructures((res.data)))
  }
  
  async make(options) {
    if(!options.url) options.url = default_uri
    if(options.resource) options.url+=options.resource
    const res = await httpREQUEST(options)
    return this.__result__(res)
  }
  
  async httpREQUEST(options) {
    const res = await axios(options)
    return res
  }
}