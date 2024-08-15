module.exports = (array) => {
  const vector = new Array(60).fill(0)
  array.map(k => vector[k - 1] = 1)
  return vector
}