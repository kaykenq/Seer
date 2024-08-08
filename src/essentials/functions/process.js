const cluster = require("node:cluster")
const os = require("node:os")

function check_avaibles_cpus_and_divide_by_slots(maximum) {
  const cpus = os.cpus()
  return [cpus, Math.ceil(maximum / cpus)]
}

function InitializeClusters(fn, si, ei) {
  fn(si, ei).then(() => console.log(`[${cluster.worker.id}]: concluiu o download (${si} - ${ei})`)).catch((err) => console.error(`[${cluster.worker.id}]: ocorreu um erro ${err}`))
}

function main(total, fn, ...args) {
  const [cpus, a] = check_avaibles_cpus_and_divide_by_slots()
  if(cluster.isMaster) {
    console.log(`[MASTER] ${process.pid} está executando...`)
    for (let i = 0; i < cpus; i++) {
      const startIndex = i * a 
      const endIndex = Math.min(startIndex + a - 1, total - 1)
      
      cluster.fork({ startIndex, endIndex })
    }
      
    cluster.on('exit', (worker, code, signal) => {
      if(code !== 0) console.error(`Worker ${worker.process.pid} finalizado com código ${code}`)
    })
  } else {
    const startIndex = parseInt(process.env.startIndex, 10)
    const endIndex = parseInt(process.env.endIndex, 10)
    
    InitializeClusters(fn, startIndex, endIndex)
    }
  }
  
module.exports = main