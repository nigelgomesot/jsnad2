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

// throws - sync
const example4 = () => {
  const add = (a, b) => {
    if (typeof a != 'number' || typeof b != 'number')
      throw new Error('a & b must be numbers')

    return a + b
  }

  assert.throws(() => add('5', '5'), Error('a & b must be numbers'))
  assert.doesNotThrow(() => add(5, 5))
}

const run = () => example4()
run()
