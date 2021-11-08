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

const example2 = () => {
  const add = (a, b) => a + b

  const sum = add(1, 2)

  assert.equal('3', sum)
  assert.equal(typeof sum, 'number')
}

const run = () => example2()
run()
