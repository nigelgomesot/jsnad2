
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

// try/catch errors
class OddError extends Error {
  constructor(varName = '') {
    super(`${varName} must be even`)
  }

  get name() {
    return 'OddError'
  }
}

const validateNumber = num => {
  if (typeof num !== 'number')
    throw new TypeError('num must be a number')

  if (num < 0)
    throw new RangeError('num must be positive')

  if (num % 2 !== 0)
    throw new OddError('num')

  return true
}

const logError = error => {
  let message = ''

  switch(true) {
    case error instanceof TypeError:
      message = 'type-error: not a number'
      break
    case error instanceof RangeError:
      message = 'range-error: not a positive number'
      break
    case error instanceof OddError:
      message = 'odd-error: not an even number'
      break
    default:
      message = 'unknown-error'
  }

  console.error(message)
}

// try/catch error instanceof
const example8 = () => {
  try {
    const result = validateNumber(4)
    console.log(result)
  } catch(err) {
    logError(err)
  }
}

// try/catch error instanceof with incorrect error message
const example9 = () => {
  try {
    const result = validateNumber(4)
    console.log(result())
  } catch(err) {
    logError(err)
  }
}


// try/catch with error codes
const codifyError = (error, code) => {
  error.code = code
  return error
}

const validateNumberWithErrorCode = num => {
  if (typeof num !== 'number')
    throw codifyError(new TypeError('num must be a number'), 'ERR_MUST_BE_NUMBER')

  if (num < 0)
    throw codifyError(new RangeError('num must be positive'), 'ERR_NUMBER_MUST_BE_POSITIVE')

  if (num % 2 !== 0)
    throw codifyError(new OddError('num'), 'ERR_NUMBER_MUST_BE_EVEN')

  return true
}

const logErrorCode = error => {
  let message = ''

  switch(error.code) {
    case 'ERR_MUST_BE_NUMBER':
      message = 'type-error-code: not a number'
      break
    case 'ERR_NUMBER_MUST_BE_POSITIVE':
      message = 'range-error-code: not a positive number'
      break
    case 'ERR_NUMBER_MUST_BE_EVEN':
      message = 'odd-error-code: not an even number'
      break
    default:
      message = 'unknown-error-code'
  }

  console.error(message)
}

const example10 = () => {
  try {
    const result = validateNumberWithErrorCode(2)
    console.log(result())
  } catch(err) {
    logErrorCode(err)
  }
}

// callback try/catch
const example11 = () => {
  setTimeout(() => {
    try {        
      const result = validateNumberWithErrorCode(2)
      console.log(result())
    } catch(err) {
      logErrorCode(err)
    }
  }, 2000)
}


const run = () => {
  example11()
}
run()
