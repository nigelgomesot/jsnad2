const { test } = require('tap')
const addSync = require('../addSync')

test('throws error for invalid inputs', async ({ throws }) => {
  throws(() => addSync('1', 2), Error('a & b must be numbers'))
})

test('adds numbers', async ({ equal }) => {
  equal(addSync(1, 2), 3)
})
