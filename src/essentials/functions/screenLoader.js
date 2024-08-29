const load = ["|", "/", "-", "\\"]

module.exports = (msg, time) => {
  let c = 0
  return setInterval(() => {
    if(c > load.length) c = 0
    process.stdint.write(msg, load[c])
    c++ // c-sharp????
  }, time || 1000)
}