'use strict'
const assert = require('assert')
const URL = require('url').URL

function parseUrl (str) {
  try {
    const parsed = new URL(str)
    return parsed
  } catch(err) {
    console.error(`error occurred: ${err.message}`)

    return null
  }
}

assert.doesNotThrow(() => { parseUrl('invalid-url') })
assert.equal(parseUrl('invalid-url'), null)
assert.deepEqual(
  parseUrl('http://example.com'), 
  new URL('http://example.com')
)
console.log('passed!')