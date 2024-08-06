const toLocaleStringFormatter = require('../functions/toLocaleStringFormatter.js')

module.exports = class Base {
  toJSON(data) {
    JSON.stringify(data)
  }
  
  localeString(x /* I don't know if it's a number or string, then, I'll name as 'x' */) {
    return toLocaleStringFormatter(x, global.language)
  }
}