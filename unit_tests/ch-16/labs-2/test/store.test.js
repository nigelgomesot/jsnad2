'use strict'

const store = require('../store')

test('throws error for invalid input', done => {
    store(1, (err, result) => {
        expect(err).toStrictEqual(Error('input must be a buffer'))
        expect(result).toStrictEqual(undefined)
        done()
    })
})

test('stores the input', done => {
    store(Buffer.from('1'), (err, result) => {
        expect(err).toStrictEqual(null)
        expect(result.id.length).toStrictEqual(4)
        done()
    })
})