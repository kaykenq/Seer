const Base = require("./Base.js")
const { responses_storage } = require("../../../utils/routes.json");

module.exports = class ResponsesDataManager extends Base {
  constructor() {
    super(responses_storage, { responses: [] })
  }
}