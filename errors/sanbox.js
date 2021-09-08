
// simple errors, Error object and throw
const example1 = () => {
  const validateNumber = num => {
      if (typeof num !== 'number')
        throw new Error('not a number')

      if (num < 0)
        throw "number less than zero!"

      console.log('validated')

      return true
  }

  validateNumber('a')
  //validateNumber(-1)
  validateNumber(6)
}

// native errors (Reference error)
const example2 = () => {
  console.log(invalid_reference)
}

// native errors (object characteristics)
const example3 = () => {
  const err = new SyntaxError('this is a syntax error')
  console.log(`err instanceof SyntaxError: ${err instanceof SyntaxError}`)
  console.log(`err instanceof Error: ${err instanceof Error}`)
  console.log(`err instanceof RangeError: ${err instanceof RangeError}`)
  console.log(`err message: ${err.message}`)
}

// example 1 with native errors
const example4 = () => {
  const validateNumber = num => {
    if (typeof num !== 'number')
      throw new TypeError('must be a number')

    if (num < 0)
      throw new RangeError('"number must be >= 0')

    console.log('validated')

    return true
  }

  //validateNumber('a')
  //validateNumber(-1)
  validateNumber(6)
}


// error code
const example5 = () => {
  const validateNumber = num => {
    if (num % 2 == 0)
      return true

    const err = new Error('num must be even')
    err.code = 'ERR_MUST_BE_EVEN'
    throw err
  }

  validateNumber(3)
}

// custom error constructor
const example6 = () => {
  class OddError extends Error {
    constructor(varName = '') {
      super(`${varName} must be even`)
    }

    get name() {
      return 'OddError'
    }
  }

  const validateNumber = num => {
    if (num % 2 == 0)
      return true

    const err = new OddError('num')
    throw err
  }

  validateNumber(3)
}

// error code and custom error constructor
const example7 = () => {
  class OddError extends Error {
    constructor(varName = '') {
      super(`${varName} must be even`)
      this.code = 'ERR_MUST_BE_EVEN'
    }

    get name() {
      return `OddError: [${this.code}]`
    }
  }

  const validateNumber = num => {
    if (num % 2 == 0)
      return true

    const err = new OddError('num')
    throw err
  }

  validateNumber(3)
}

const run = () => {
  example7()
}
run()
