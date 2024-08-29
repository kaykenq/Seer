const { version } = require("../../utils/paths.json");
const HTTP = require("../HTTP.js");

module.exports = class Version extends HTTP {
  constructor() {
    super()
    
    this.rawURL = "https://github.com/kaykenq/lotery";
    this.oldVersion = fs.readFileSync(version)
    this.newVersion = this.oldVersion
  }
  
  async getVersion() {
    const res = super.httpREQUEST(this.rawURL)
    this.newVersion = res.data
  }
  
  checkIfNeedUpdate() {
    getVersion()
    if(this.oldVersion !== this.newVersion) return update()
    return;
  }
  
  update() {
    log.warn()
    input()
    log.info()
    let dotCount = 0;
    const interval = setInterval(() => {
      dotCount++
      process.stdout.write(`${'.'.repeat(dotCount)}`)
    }, 1000)
    const gitPull = child_process.spawn('git', ['pull'], {
      stdio: "ignore",
      detached: true
    });
    
    gitPull.on('error', (error) => {
      log.error()
    })
    
    gitPull.on('close', (code) => {
      clearInterval(interval)
      log.info()
    })
    gitPull.unref()
  }
}