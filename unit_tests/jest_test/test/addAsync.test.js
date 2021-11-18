'use strict'

const addAsync = require('../addAsync')

test('throws errors for invalid inputs', async () => {
    await expect(addAsync('1', 1))
            .rejects
            .toStrictEqual(Error('a & b must be numbers'))
})

test('adds 2 numbers', async () => {
    const result =  await addAsync(1, 2)
    expect(result).toStrictEqual('result is: 3')
})
