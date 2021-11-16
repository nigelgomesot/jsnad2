'use strict'

const addCallback = require('../addCallback')

test('throws errors for invalid inputs', done => {
    addCallback('1', 1, (err, result) => {
        expect(err).toStrictEqual(Error('a & b must be numbers'))
        expect(result).toStrictEqual(undefined)
        done()
    })
})

test('adds numbers', done => {
    addCallback(1, 2, (err, result) => {
        expect(err).toStrictEqual(null)
        expect(result).toStrictEqual('result is: 3')
        done()
    })
})