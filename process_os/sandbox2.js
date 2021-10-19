'use strict'

const { stdin } = require('process')

//console.log('initialized with:', process.stdin.isTTY ? 'terminal' : 'piped to')

//process.stderr.write(process.stdin.isTTY ? 'terminal\n' : 'piped to\n')
console.error('initialized with:', process.stdin.isTTY ? 'terminal' : 'piped to')

const { Transform } = require('stream')
const createUpperCaseStream = () => {
  return new Transform({
    transform(chunk, enc, next) {
      const uppercased = chunk.toString().toUpperCase()
      next(null, uppercased)
    }
  })
}

const upperCaseStream = createUpperCaseStream()

process.stdin.pipe(upperCaseStream).pipe(process.stdout)

