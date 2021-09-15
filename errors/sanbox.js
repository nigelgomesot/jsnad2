
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
      message = `unknown-error: ${error.message}`
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


// rejections
const validateNumberPromise = num => {
  return new Promise((resolve, reject) => {
    if (typeof num !== 'number')
      return reject(new TypeError('num must be a number'))
  
    if (num < 0)
      return reject(new RangeError('num must be positive'))
  
    if (num % 2 !== 0)
      return reject(new OddError('num'))
  
    return resolve(true)
  })
}

const example12 = () => {
  validateNumberPromise(4)
    .then(console.log)
    .catch(logError)

  validateNumberPromise(3)
    .then(console.log)
    .catch(logError)

  validateNumberPromise(4)
    .then(result => {throw new Error('custom error')})
    .catch(logError)
}

// async try/catch
const example13 = () => {
  async function asyncValidateNumber(num) {
    try {
      const result = await validateNumberPromise(num)
      console.log(result)
    } catch (err) {
      logError(err)
    }
  }

  asyncValidateNumber('')
  asyncValidateNumber(-2)
  asyncValidateNumber(3)
  asyncValidateNumber(2)
}

const validateNumberErrorOnly = num => {
  const result = validateNumberWithErrorCode(num)
  throw Error('some other error')

  return result
}

const throwError = error => {
  switch(error.code) {
    case 'ERR_MUST_BE_NUMBER':
      throw Error('type-error-code: not a number')
    case 'ERR_NUMBER_MUST_BE_POSITIVE':
      throw Error('range-error-code: not a positive number')
    case 'ERR_NUMBER_MUST_BE_EVEN':
      throw Error('odd-error-code: not an even number')
    default:
      throw Error(`unknown-error-code: ${error.message}`)
  }
}

// async/await error propogation
const example14 = () => {
  async function asyncValidateNumberErrorOnly(num) {
    try {
      const result = await validateNumberErrorOnly(num)
      console.log('result: ', result)
    } catch(err) {
      throwError(err)
    }
  }

  asyncValidateNumberErrorOnly('-1')
    .catch(console.error)
  asyncValidateNumberErrorOnly(-1)
    .catch(console.error)
  asyncValidateNumberErrorOnly(1)
    .catch(console.error)
  asyncValidateNumberErrorOnly(4)
    .catch(console.error)
}

// synchronous error propogation
const example15 = () => {
  function asyncValidateNumberErrorOnly(num) {
    try {
      const result = validateNumberErrorOnly(num)
      console.log('result: ', result)
    } catch(err) {
      console.log('re-throwing error')
      throwError(err)
    }
  }

  try { asyncValidateNumberErrorOnly('-1') } catch(err) { console.error(err) }
  try { asyncValidateNumberErrorOnly(-1) } catch(err) { console.error(err) }
  try { asyncValidateNumberErrorOnly(1) } catch(err) { console.error(err) }
  try { asyncValidateNumberErrorOnly(4) } catch(err) { console.error(err) }
}


// callback based error propogation
const example16 = () => {
  const validateNumberWithCallback = (num, cb) => {
    if (typeof num !== 'number')
      return cb(codifyError(new TypeError('num must be a number'), 'ERR_MUST_BE_NUMBER'))

    if (num < 0)
      return cb(codifyError(new RangeError('num must be positive'), 'ERR_NUMBER_MUST_BE_POSITIVE'))

    if (num % 2 !== 0)
      return cb(codifyError(new OddError('num'), 'ERR_NUMBER_MUST_BE_EVEN'))

    return cb(null, true)
  }

  const runValidateNumberWithCallback = (num, cb) => {
    const propogateErrorCallback = (error, result) => {
      if (!error)
       return cb(null, result)
  
      switch(error.code) {
        case 'ERR_MUST_BE_NUMBER':
          return cb(Error('type-error-code: not a number'))
        case 'ERR_NUMBER_MUST_BE_POSITIVE':
          return cb(Error('range-error-code: not a positive number'))
        case 'ERR_NUMBER_MUST_BE_EVEN':
          return cb(Error('odd-error-code: not an even number'))
        default:
          return cb(Error(`unknown-error-code: ${error.message}`))
      }
  
      
    }

    validateNumberWithCallback(num, propogateErrorCallback)
  }

  const mainCallback = (err, result) => {
    if (err)
      console.error('error occurred:', err)
    else
      console.log('result:', result)
  }

  runValidateNumberWithCallback(3, mainCallback)
  runValidateNumberWithCallback(4, mainCallback)
}

const run = () => {
  example16()
}
run()
