const { 
  Worker,
  isMainThread,
  threadId,
  workerData
}  = require("node:worker_threads");

async function downloadUrls(urls, fn) {
  const result = {}
  for(const url of urls) {
    await fn(url)
  }
}

if(isMainThread) downloadUrls(workerData.urls)
else {
  module.exports = downloadInGroups(urls, nThreads) {
    const groupSize = Math.ceil(urls.length / nThreads)
    const groups = []
    for(let i = 0; i < urls.length; i += groupSize) {
      groups.push(urls.slice(i, i + groupSize))
    }
    
    const promises = groups.map(group => new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: { urls: group }
      })
      
      worker.on("message", log.thread(`[${threadId}] retornou:`, resolve))
      worker.error("error", log.error(`[${threadId}] retornou:`, reject))
    }))
    
    return Promise.all(promises)
  }
}