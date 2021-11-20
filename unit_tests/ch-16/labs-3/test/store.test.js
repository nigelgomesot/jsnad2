'use strict'

const store = require('../store')

test('rejects for invalid input', async () => {
    expect(store(1))
        .rejects
        .toStrictEqual(Error('input must be a buffer'))
})

test('stores the input', async () => {
    const result = await store(Buffer.from('1'))
    expect(result.id.length).toStrictEqual(4)
})
