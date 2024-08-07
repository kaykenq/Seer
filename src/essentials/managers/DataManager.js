// @ts-check
const { writeFileSync, readFileSync } = require('node:fs');
const path = require('node:path');

module.exports = class DataManager {
  constructor(file) {
    this.path = path.resolve(__dirname, file);
  }
  
  read() {
    return readFileSync(this.path, "utf-8")
  }
  
  write(data) {
    return writeFileSync(this.path, data, "utf-8")
  }
  
  set(key, value) {
    const result = this.read()
    if(!result) return this.write()
    
    const oldData = JSON.parse(result)
    oldData[key] = value
    
    const data = JSON.stringify(oldData)
    return [data, this.write(data)]
  }
  
  delete(data) {
    const result = this.read()
    if(!result) return;
    
    return [data, delete data]
  }
  
  get_specific_key(key) {
    const result = this.read()
    
    return [key.split('.').reduce((acc, key) => acc[key], result), true]
  }
  
  get(key) {
    const result = this.read()
    
    return result[key]
  }
  /**
   * @description Get all Database's Schemes
   * @returns {object}
   * @example
   * ```js
   * <DataManager>.getAll()
   * ```
   */
  getAll() {
    return this.read()
  }
}