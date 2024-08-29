const { version } = require("../../utils/paths.json");
const HTTP = require("../HTTP.js");
const ScreenLoad = require("./screenLoader.js");

module.exports = class Version extends HTTP {
  constructor() {
    super()
    
    this.rawURL = "https://raw.githubusercontent.com/kaykenq/lotery/main/version";
    this.oldVersion = fs.readFileSync(version)
    this.newVersion = this.oldVersion
  }
  
  async getVersion() {
    const res = await super.httpREQUEST(this.rawURL)
    this.newVersion = res.data
  }
  
  checkIfNeedUpdate() {
    getVersion()
    if(this.oldVersion == this.newVersion) return;
    log.warn()
    input()
    // fazer uma alteração aqui para pegar a resposta do usuário
  }
  
  update() {
    const Updating = ScreenLoad('')
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