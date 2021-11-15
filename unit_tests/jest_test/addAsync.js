'use strict'

const { promisify } = require('util')

const timeoutPromise = promisify(setTimeout)

const addAsync = async (a, b) => {
  await timeoutPromise(300)

  if (typeof a != 'number' || typeof b != 'number')
    throw new Error('a & b must be numbers')
  else
    return `result is: ${a + b}`
}

module.exports = addAsync
