const Base = require("./Base.js");
const { winning_numbers_storage } = require("../../../utils/paths.json");

module.exports = class WinningNumbersDataManager extends Base {
  constructor() {
    super(winning_numbers_storage, { winningNumbers: [] })
  }
}