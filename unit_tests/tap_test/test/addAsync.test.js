'use strict'

const { test } = require('tap')
const addAsync = require('../addAsync')

test('rejects with errors for invalid inputs', async ({ rejects }) => {
  await rejects(addAsync('1', 1), Error('a & b must be numbers'))
})

test('adds numbers', async ({ ok, strictSame }) => {
  const result = await addAsync(1, 2)
  ok(result)
  strictSame('result is: 3', result)
})
