const chalk = require('chalk');
const Inquirer = require("inquirer");
const Keys = require("../utils/keys_logger.json");
const { levels, meaning } = require('../utils/levels.json');

function input(message, name) {
  return Inquirer.prompt([{
    type: 'input',
    name: name || "USER_INPUT",
    message: message
  }])
}

function global_setup(level) {
  configuration_levels(level).forEach(x => {
    global.log[x] = (...message) => print(x, chalk.bgBlack.white, ...message)
  })
  global.input = (message, type) => input(message, type)
}

function transform(level) {
  let transformed_meanings = []
  Object.values(meaning[level]).forEach(x => {
    for(let key of x) {
      transformed_meanings.push(Key[key])
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
}

function content(key) {
  const messageThreadOrClusterColor = (cOrt, id) => `${chalk.hex("#f77b55").bgBlack.bold(cOrt)} ${id}`
  let m = ""
  if(!cluster.isPrimary) m += messageThreadOrClusterColor('CLUSTER', cluster.worker.id)
  else if (!worker_threads.isMainThread) m += messageThreadOrClusterColor('THREAD', worker_threads.threadId)
  else return `[${chalk.bgBlack.bold.green("MASTER")} -> ${configuration_keys[key]}]`
  return `[${m}] -> [${configuration_keys[key]}]`
}

function print(key, color, ...message) {
  return console.log(content(key), color(...message))
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