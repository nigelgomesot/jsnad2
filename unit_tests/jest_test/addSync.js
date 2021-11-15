'use strict'

const addSync = (a, b) => {
  if (typeof a != 'number' || typeof b != 'number')
    throw new Error('a & b must be numbers')

  return a + b
}

module.exports = addSync
