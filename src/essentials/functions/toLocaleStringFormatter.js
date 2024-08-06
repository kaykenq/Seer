const fns = {
  'pt-br': (x) => x.replace(',', '.'), // if there's a comma, such as 10220,92
}

module.exports = (k, l) => {
  l ??= "pt-br"
  const n = fns[l](k)
  return Number(n).toLocaleString(l)
}