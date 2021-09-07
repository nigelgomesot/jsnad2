
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

const run = () => {
  example4()
}
run()
