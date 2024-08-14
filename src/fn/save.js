module.exports.ids = async (cache, database) => {
  cache.forEach((x, k) => {
    await database.update(({ games }) => games.push({ k: x }))
    log.debug(`${x} foi salvo no banco de dados ${database.filename} (id: ${k})`)
  })
  
  log.info(`todos os dados foram salvos`, database)
}

module.exports.response = async (r, cache, database) => {
  cache.forEach((x, k) => {
    await database.update(({ responses }) => responses.push(r))
    log.debug(`${x} foi salvo no banco de dados (id: ${r.id}; winning number: ${r.winningNumber}`)
    })
    log.info(`todos os dados foram salvos`, database)
  }

module.exports.winningNumber = async (cache, database, rdb) => {
  const responses = rdb.read.responses
  responses.map(x => {
    await database.update(({ winningNumbers }) => winningNumbers.push({ [x.id]: x.winningNumber }))
    log.debug()
  })
}