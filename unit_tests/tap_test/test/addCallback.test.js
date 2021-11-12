'use strict'

const { test } = require('tap')
const addCallback = require('../addCallback')

test('throws error for invalid inputs', ({ equal, strictSame, end }) => {
  addCallback('1', 1, (err, data) => {
    strictSame(err, Error('a & b must be numbers'))
    equal(undefined, data)
    end()
  })
})

test('adds numbers', ({ ok, equal, error, end }) => {
  addCallback(1, 2, (err, data) => {
    error(err)
    ok(data)
    equal('result is: 3', data)
    end()
  })
})
