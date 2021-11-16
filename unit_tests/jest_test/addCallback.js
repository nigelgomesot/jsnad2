'use strict'

const addCallback = (a, b, cb) => {
  setTimeout(() => {
    if (typeof a != 'number' || typeof b != 'number')
      return cb(new Error('a & b must be numbers'))

    cb(null, `result is: ${a + b}`)
  }, 3000)
}

module.exports = addCallback
