const MaxCPUS = os.availableParallelism()

const result = []
const bestNumbers = []
const filtered = []
const recommended = 4

function createAnotherWorkerEmergently(worker, code, signal) {
  if(cluster.workers.length == MaxCPUS) return;
  cluster.fork()
  }
}

function filterAllAppearedNumbers(games, ids) {
  const result = []
  const numbers = games.flat(games.length)
  for(let i = 0;i < ids.length; i++) {
    const arr = numbers.filter(x => x == ids[i * cluster.worker.id])
    const times = arr.length
    const rating = times / numbers.length
    result.push({ target, times, rating })
  }
  
  return result;
}

function filterAllAppearedSequences(games, sequences) {
  const result = []
  for(let i = 0; i < sequences.length; i++) {
    const arr = games.filter((v, j) => v == sequences[i * cluster.worker.id][j])
    const times = arr.length
    const rating = times / games.length
    
    result.push({ target, times, rating })
  }
  
  return result;
}

function divide_by_groups(arr) {
  const result = Math.ceil(arr.length / MaxCPUS)
  const groups = []
  for(let i = cluster.worker.id - 1; i <= result; i++) {
    groups.push(arr.slice(i * result, (i + 1) * result))
  }
  return groups
}

function BestChoice(filteredNumbers) {
  const groupsMappedByRating = filteredNumbers.map(x => x.rating)
  const organizedRating = groupsMappedByRating.sort((a, b) => b - a)
  const idByRating = []
  for(const n in organizedRating) {
    idByRating.push(filteredNumbers[0][groupsMappedByRating.indexOf(n)])
  }
  
  return bestNumbers.push(idByRating.slice(0, 5))
}

function checkRatingSequence(filteredSequences) {
  const sequenceMappedByTarget = filteredSequences.map(x => x.target)
  const sequenceCreatedByTarget = bestNumbers.map(x => x.target)
  const foundSequence = sequenceMappedByTarget.findIndex((list) => list.every((v, k) => v === sequenceCreatedByTarget[k]))
  if(foundSequence !== -1) return result.push(filteredSequences[foundSequence].rating);
  
  const sequenceMappedByRating = bestNumbers.map(x => x.rating)
  return result.push(sequenceMappedByRating.reduce((a, b) => a * b));
}

function filterAll(groups, games) {
  const filteredNumbers = filterAllAppearedNumbers(games, groups[cluster.worker.id])
  const filteredSequences = filterAllAppearedSequences(games, groups[cluster.worker.id])
  filtered[0].push(filteredNumbers) // this one for the filtered numbers 
  filtered[1].push(filteredSequences) // and this another one for the filtered sequences
  // This part of the code depends of Cluster ID to choose the groups so I don't need to worry about flooding my Filtered Array
}

module.exports = (games) => {
  if(cluster.isPrimary) {
    for(let i = 0; i < MaxCPUS; i++) {
      const worker = cluster.fork()
      worker.on("exit", createAnotherWorkerEmergently)
    }
  } else {
    const groups = divide_by_groups(games)
    filterAll(groups, games)
  }
  BestChoice(filtered[0])
  checkRatingSequence(filtered[1])
  
  return [bestNumbers, result];
}