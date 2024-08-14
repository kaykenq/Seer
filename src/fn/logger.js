const chalk = require('chalk');
const { levels, meaning } = require('../utils/levels.json');
const Keys = require("../utils/keys_logger.json");
const { isMainThread, threadId } = require("node:worker_threads")

global_setup(level) {
  configuration_levels(level).forEach(x => {
    global.log[x] = (...message) => print(x, chalk.bgBlack.white, ...message)
  })
}

function transform(level) {
  let transformed_meanings = []
  Object.values(meaning[level]).forEach(x => {
    for(let key of x) {
      transformed_meanings.push(Key[x])
    }
  })
  
  return transformed_meanings
}

const configuration_levels = (level) => transform(level)

const configuration_keys = {
  info: chalk.bgBlack.green("INFO"),
  info_plus: chalk.bgBlack.bold.green("INFO"),
  warning: chalk.bgBlack.yellow("WARNING"),
  warning_plus: chalk.bgBlack.bold.yellow("WARNING"),
  error: chalk.bgBlack.bold.red("ERROR"),
  critical: chalk.bgRed.bold.white("CRITICAL"),
  debug: chalk.bgBlack.bold.cyan("DEBUG"),
  request: chalk.bgBlack.bold.orange("REQUEST"),
  response: chalk.bgBlack.bold.magenta("RESPONSE"),
  /*thread: `${this.debug}:` + chalk.bgBlack.bold.blue("THREAD"),
  cluster: `${this.debug}:` + chalk.hex("#f77b55").bgBlack.bold("CLUSTER")*/
}

function print(key, color, ...message) {
  if(isMainThread) return console.log(`[${configuration_keys[key]}]`, color(...message))
  else if (isMainThread) console.log(`[${configuration_keys[key]}:${chalk.hex("#f77b55").bgBlack.bold("THREAD")}] - [${chalk.hex("#24ab5e").bgBlack.bold(threadId)}]`, color(...message))
  
}

module.exports = class Console {
  constructor(level) {
    this._main(level)
  }
  
  _main(level) {
    switch(level) {
      case 0:
        global_setup(0)
        break;
      case 1:
        global_setup(1)
        break;
      case 2:
        global_setup(2)
        break;
      case 3: 
        global_setup(3)
        break;
      default:
        console.error("Something is wrong about the level", level)
    }
  }
}