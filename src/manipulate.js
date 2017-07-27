exports.extractValueOf = (o, property) => {
  let output = {}
  if (!!o && o[property]) {
    output = { [property]: o[property] }
  }
  return output
}

exports.extractCurrency = (o, _id) => {
  if (!!o && o.length) {
    const result = o.filter(({id}) => id === _id)
    if (result.length > 0) {
      return { [_id]: result[0] }
    }
  }
  return {}
}

exports.extractValuesOfProperty = (o, currencies, property) => {
  if (currencies.length > 0) {
    return currencies.map(currency => {
      const extract = this.extractCurrency(o, currency)[currency]
      const { id, last_updated } = extract
      return {[id]: {[last_updated]: extract[property] }}
    }).reduce((a, e) => Object.assign(a, e))
  }
  return {}
}

exports.extendValues = (input, extend) => {
  if (input && extend) {
    return Object.assign(Object.keys(input), Object.keys(extend)).map(coin => {
      return { [coin]: Object.assign(input[coin], extend[coin]) }
    }).reduce((a, e) => Object.assign(a, e))
  }
  if (input) { return input }
  if (extend) { return extend }
  return {}
}
