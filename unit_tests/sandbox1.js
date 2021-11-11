const assert = require('assert')

// core methods
const example1 = () => {
  assert.ok(1)
  assert.equal(1,1)
  assert.notEqual(1,2)
  assert.strictEqual(1,1)
  assert.notStrictEqual(1,'1')
  assert.deepEqual({'a': 1}, {'a': '1'})
  assert.notDeepEqual({'a': 1}, {'b': '1'})
  assert.deepStrictEqual({'a': 1}, {'a': 1})
  assert.notDeepStrictEqual({'a': 1}, {'a': '1'})

  function throwsErrorFn() { throw new Error() }
  assert.throws(throwsErrorFn)
  assert.doesNotThrow(() => {})

  assert.rejects(() => Promise.reject())
  assert.doesNotReject(() => Promise.resolve())

  assert.ifError(null)
  assert.match('888-888-8888', /^\d{3}-\d{3}-\d{4}$/)
  assert.doesNotMatch('8A8-888-8888', /^\d{3}-\d{3}-\d{4}$/)

  assert.fail()
}

// strict equality 1
const example2 = () => {
  const add = (a, b) => a + b

  const sum = add(1, 2)

  assert.equal('3', sum)
  assert.equal(typeof sum, 'number')
}

// strict equality 2
const example3 = () => {
  const add = (a, b) => (a + b)//.toString()

  const sum = add(1, 2)

  assert.strictEqual(3, sum)
}

// errors - sync
const example4 = () => {
  const add = (a, b) => {
    if (typeof a != 'number' || typeof b != 'number')
      throw new Error('a & b must be numbers')

    return a + b
  }

  assert.throws(() => add('5', '5'), Error('a & b must be numbers'))
  assert.doesNotThrow(() => add(5, 5))
}

// errors - callback
const example5 = () => {
  const addCallback = (a, b, cb) => {
    setTimeout(() => {
      if (typeof a != 'number' || typeof b != 'number')
        return cb(new Error('a & b must be numbers'))

      cb(null, `result is: ${a + b}`)
    })
  }

  addCallback(1, 2, (err, result) => {
    assert.ifError(err)
    assert.equal('result is: 3', result)
  })

  addCallback('1', 2, (err, result) => {
    assert.deepStrictEqual(err, new Error('a & b must be numbers'))
    assert.strictEqual(undefined, result)
  })
}

// errors - promise
const example6 = () => {
  const { promisify } = require('util')

  const timeoutPromise = promisify(setTimeout)

  const asyncAdd = async (a, b) => {
    await timeoutPromise(300)

    if (typeof a != 'number' || typeof b != 'number')
      throw new Error('a & b must be numbers')
    else
      return `result is: ${a + b}`
  }

  assert.rejects(asyncAdd('1', 2), Error('a & b must be numbers'))

  assert.doesNotReject(asyncAdd(1, 2))
}

const run = () => example6()
run()
