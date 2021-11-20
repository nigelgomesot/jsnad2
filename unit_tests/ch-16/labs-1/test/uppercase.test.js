'use strict'

const { test } = require('tap')
const uppercase = require('../uppercase')

test('throws error for non-string inputs', async ({ throws }) => {
    throws(() => uppercase(1), Error('input must be a string'))
})

test('converts string to upper case', async ({ ok, strictSame }) => {
    const result = uppercase('abc')
    ok(result)
    strictSame('ABC', result)
})
