const fns = {
  'PT-br': (x) => x.replace(',', '.'), // if there's a comma, such as 10220,92
}

module.exports = (k, l) => {
  const n = fns[l](k)
  return Number(n).toLocaleString(l ?? 'PT-br')
}