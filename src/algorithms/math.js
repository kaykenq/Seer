const MaxCPUS = os.availableParallelism()

const final_result = []
const result_filtered = []
const groups = []
const bestId = []

const quantityToFilters = 2

process.env.completedWork = 0

function createAnotherWorkerByEmergency(worker, code, signal) {
  if(!final_result[0] && cluster.workers.length >= quantityToFilters) return;
  for(let i = 0; i < cluster.workers.length - q; i++) {
    cluster.fork()
  }
}

function killASpecificProcessFromN(n) {
  for(const id in cluster.workers) {
    if(!parseInt(id) >= n) return;
    cluster.workers[id].kill()
  }
}

function divide_by_groups(arr, id) {
  const result = Math.ceil(arr.length / MaxCPUS)
  for(let i = id - 1; i <= result; i++) {
    groups.push(arr.slice(i * result, (i + 1) * result))
  }
  
  if(process.env.completedWork == MaxCpus) return process.send([1, 1, 3])
  process.env.completedWork++
}

function filterAllAppearedNumbers(games, ids) {
  const result = []
  const numbers = games.flat(games.length)
  for(const target in ids) {
    const arr = numbers.filter(x => x == target)
    const times = arr.length
    const rating = times / numbers.length
    result.push({ target, times, rating })
  }
  
  return result;
}

function filterAllAppearedSequences(games, sequences) {
  const result = []
  for(const target in sequences) {
    const arr = games.filter((v, i) => v == target[i])
    const times = arr.length
    const rating = times / games.length
    
    result.push({ target, times, rating })
  }
  
  return result;
}

function BestChoice() {
  const groupsMappedByRating = result_filtered[0].map(x => x.rating)
  const organizedRating = groupsMappedByRating.sort((a, b) => b - a)
  const idByRating = []
  for(const n in organizedRating) {
    idByRating.push(result_filtered[0][groupsMappedByRating.indexOf(n)])
  }
  
  return bestId.push(idByRating.slice(0, 5))
}

function checkRatingSequence() {
  const sequenceMappedByTarget = result_filtered[1].map(x => x.target)
  const sequenceCreatedByTarget = bestId.map(x => x.target)
  const foundSequence = sequenceMappedByTarget.findIndex((list) => list.every((v, k) => v === sequenceCreatedByTarget[k]))
  if(foundSequence !== -1) return final_result.push(result_filtered[1][foundSequence]);
  
  const sequenceMappedByRating = bestId.map(x => x.rating)
  return final_result.push(sequenceMappedByRating.reduce((a, b) => a * b));
}

const numbersGroups = (games) => games.flat(games.length)

const sequencesGroups = (games) => games

function divide(id, games) {
  const args = [numbersGroups, sequencesGroups]
  const res = args[id - 1](games)
  final_result.push(res)
  return process.send(true)
}

function filterAll(id, games) {
  const funcs = [filterAllAppearedNumbers, filterAllAppearedSequences];
  const res = funcs[id - 1](result_groups[id - 1])
  result_filtered.push(res)
  if(completedWork == quantityToFilters) return process.send([1, 0, 0, cluster.worker.id])
  else return process.env.completedWork++
}

module.exports = (games) => {
  if(cluster.isPrimary) {
    for(let i = 0; i < MaxCPUS; i++) {
      const worker = cluster.fork({ done: 0 })
      
      worker.on("message", ([bool, killSpecific, q, id]) => {
        if(bool) {
          process.env.completedWork = 0
          log.info()
          if(!killSpecific) killASpecificProcessFromN(q)
          else cluster.workers[id].kill()
        }
      })
      worker.on("exit", createAWorkerByEmergency)
    }
  } else {
    const group = divide_by_groups(cluster.worker.id, games)
    if(!cluster.workers.length == quantityToFilters) return process.kill(0)
    filterAll(cluster.worker.id, games)
  }
  BestChoice()
  checkRatingSequence()
  
  return final_result;
}