const IdDataManager = require("./Ids.js");
const ResponsesDataManager = require("./Responses.js");
const WinningNumbersDataManager = require("./WinningNumbers.js")
const {
  isMaster,
  fork,
  availableParallelism
} = require("node:cluster");

// refiz mas ainda ta uma merda, mas ta melhor

async function save_id(res) {
  db = new IdDataManager()
  await db.update(({ games }) => games.push(res.id))
}

async function save_response(res) {
  db = new ResponsesDataManager()
  await db.update(({ responses }) => responses.push({ [res.id]: res }))
}

async function save_winning_numbers(res) {
  db = new WinningNumbersDataManager()
  await db.update(({ winningNumbers }) => [res.id]: res.winningNumbers)
}

const functions = [save_id, save_response, save_winning_numbers]

async function rec(obj) {
  const [id, res] = obj
  await (functions[id])(res)
  log.info("sla mano")
}

function active_cluster(res) {
  const numCpus = availableParallelism()
  if(isMaster) {
    for(let i = 0; i <= functions.length; i++) {
      const worker = fork()
      worker.send([i, res])
    }
  } else {
    process.on('message', rec)
  }
}

function save(res) {
  active_cluster(res)
}

module.exports = (cache) => {
  cache.forEach((_, res) => {
    save(res)
  })
}