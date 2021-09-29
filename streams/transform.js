'use strict'

// transform used for compression
const example1 = () => {
  const { createGzip } = require('zlib')
  const transform = createGzip()
  
  transform.on('data', data => console.log('gzip data:', data.toString('base64')))
  transform.write('first')
  setTimeout(() => { transform.end('2') }, 1000)
}

// custom transform example 
const example2 = () => {
  const { Transform } = require('stream')
  const { scrypt } = require('crypto')
  const createTransformStream = () => {
    return new Transform({
      decodeStrings: false,
      encoding: 'hex',
      transform(chunk, enc, next) {
        scrypt(chunk, 'a-salt', 32, (err, key) => {
          if (err)
            return next(err)

          next(null, key)
        })
      }
    })
  }

  const transform = createTransformStream()

  transform.on('data', data => console.log('data received:', data))
  transform.write('A\n')
  transform.write('B\n')
  transform.write('C\n')
  transform.end('Done.\n')
}

const run = () => example2()
run()

