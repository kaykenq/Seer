const MaximumCPUS = os.availableParallelism()
const result_groups = []
const result_filtered = []

function divide_by_groups(arr) {
  const result = Math.ceil(arr.length / MaximumCPUS)
  const groups = []
  for(let i = 0; i <= result; i++) {
    groups.push(arr.slice(i * result, (i + 1) * result))
  }
  
  return groups;
}

function filterAllAppearedNumbers(games, ids) {
  const result = []
  const numbers = games.flat(games.length)
  for(const target of ids) {
    const arr = numbers.filter(x => x == target)
    const times = arr.length
    const rating = times / numbers.length
    result.push({ target, times, rating })
  }
  
  return result;
}

function filterAllAppearedSequences(games, sequences) {
  const result = []
  for(const target of sequences) {
    const arr = games.filter((v, i) => v == target[i])
    const times = arr.length
    const rating = times / games.length
    
    result.push({ target, times, rating })
  }
  
  return result;
}

function BetterChoice(n) {
  const nMappedByRating = n.map(x => x.rating)
  const organizedRating = nMappedByRating.sort((a, b) => b - a)
  const idByRating = []
  for(const n of organizedRating) {
    idByRating.push(n[nMappedByRating.indexOf(n)])
  }
  
  return idByRating.slice(0, 5)
}

function checkRatingSequence(sequence 
, s) {
  const sequenceMappedByTarget = s.map(x => x.target)
  const sequenceCreatedByTarget = sequence.map(x => x.target)
  const foundSequence = sequenceMappedByTarget.findIndex((list) => list.every((v, k) => v === sequenceCreatedByTarget[k]))
  if(foundSequence !== -1) return s[foundSequence];
  
  const sequenceMappedByRating = sequence.map(x => x.rating)
  return sequenceMappedByRating.reduce((a, b) => a * b);
}

const numbersGroups = (games) => games.flat(games.length)

const sequencesGroups = (games) => games

function divide(id, games) {
  const args = [numbersGroups, sequencesGroups]
  const res = args[id - 1](games)
  result_groups.push(res)
  return process.send(true)
}

function filterAll(id, games) {
  const funcs = [filterAllAppearedNumbers, filterAllAppearedSequences];
  const res = funcs[id - 1](result_groups[id - 1])
  result_filtered.push(res)
  return process.send(true)
}

function run(games, worker) {
  const betterChoice = BetterChoice(result_2)
  const result = checkRatingSequence(betterChoice, result_1)
  
  worker.send({ result })
}

module.exports = (games) => {
  if(cluster.isPrimary) {
    for(let i = 0; i < MaximumCPUS; i++) {
      const worker = cluster.fork({ done: 0 })
      cluster.send({ worker })
      
      worker.on("message", (msg) => {
        if(typeof msg == "boolean" && msg) {
          process.env.done++
          log.info()
          if(process.env.done == MaximumCPUS) return process.exit(0)
        }
      })
    }
  } else {
    process.on("message", (msg) => {
      run(games, msg.worker)
    })
  }
}