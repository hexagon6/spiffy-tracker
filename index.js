var coinmarketcap = require('coinmarketcap')

global.fetch =  require('node-fetch')

const a = async () => {
const date = new Date()
const data = await coinmarketcap.ticker({
  limit: 10,
  convert: 'eur'
})

// console.log(data.filter(({id}) => id === 'litecoin'))

const json = JSON.stringify({
	date: date,
	ticker: data
})

console.log(json)
}

a()
