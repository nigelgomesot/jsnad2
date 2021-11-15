'use strict'

const addSync = require('../addSync')

test('throws error for invalid inputs', async () => {
  expect(() => addSync('1', 1)).toThrowError(Error('a & b must be numbers'))
})

test('adds numbers', async () => {
  expect(addSync(1, 2)).toStrictEqual(3)
})
