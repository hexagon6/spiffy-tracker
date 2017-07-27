import test from 'ava'
import { ticker, date } from './data1.json'
import { ticker as ticker2, date as date2 } from './data2.json'
import {
  extractValueOf, extractValuesOfProperty,
  extendValues,
  extractCurrency
} from '../src/manipulate.js'

test('extract value in euro from dataset', t => {
  const empty = extractValueOf({}, 'price_eur')
  t.deepEqual(empty, {})

  const res = extractValueOf({ price_eur: "100"}, 'price_eur')
  t.deepEqual(res, { price_eur: "100"})
})

test('extract currency object from ticker object', t => {
  const nope = extractCurrency(ticker, 'nopecoin')
  t.deepEqual({}, nope)

  const bitcoin = extractCurrency(ticker, 'bitcoin').bitcoin
  t.deepEqual({ bitcoin: ticker[0] }, { bitcoin })

  const litecoin = extractCurrency(ticker, 'litecoin').litecoin
  t.deepEqual({ litecoin: ticker[3] }, { litecoin })
})

test('extract bitcoin value from data.json', t => {
  //t.not.deepEqual({}, { price_eur: ""})
  const eur_btc = extractValueOf(extractCurrency(ticker, 'bitcoin').bitcoin, 'price_eur')
  t.deepEqual({ price_eur: '2180.13992673' }, eur_btc)
})

test('extract bitcoin & litecoin value in € from data.json into point cloud', t => {
  const list = extractValuesOfProperty(ticker, ['bitcoin', 'litecoin'], 'price_eur')
  t.deepEqual({ 1501111771: '2180.13992673' }, list.bitcoin)

  t.deepEqual({ 1501111743: '36.4086868318' }, list.litecoin)

  t.deepEqual({
    bitcoin: { 1501111771: '2180.13992673' },
    litecoin: { 1501111743: '36.4086868318' }
  }, list)
})

test('extend multiple currencies with new values', t => {
  const input = extractValuesOfProperty(ticker, [ 'bitcoin', 'litecoin'], 'price_eur')
  const extend = extractValuesOfProperty(ticker2, [ 'bitcoin', 'litecoin'], 'price_eur')
  const extended = {
    bitcoin: { '1501111771': '2180.13992673' },
    litecoin: { '1501111743': '36.4086868318', '1501112042': '36.3329991758' }
  }
  const output = extendValues(input, extend)
  t.deepEqual(extended, output)
})