const Base = require("./Base.js");
const { ids_storage } = require("../../../utils/paths.json");

module.exports = class IdsDataManager extends Base {
  constructor() {
    super(ids_storage, { games: [] })
  }
}