module.exports = async (cache, database) => {
  cache.forEach((x, k) => {
    await database.update(({ games }) => games.push({ k: x }))
    console.log(`[+] ${x} foi salvo no banco de dados ${database.filename} (id: ${k})`)
  })
}