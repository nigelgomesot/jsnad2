'use strict'

const net = require('net')
const { Transform, pipeline } = require('stream')
const { scrypt } = require('crypto')
const { clearInterval } = require('timers')

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


net.createServer(socket => {
  const transform = createTransformStream()

  const beatInterval = setInterval(() => socket.write('beat'), 1000)

  pipeline(socket, transform, socket, (err) => {
    if (err)
      console.log('socket error occurred:', err)

    clearInterval(beatInterval)
  })
}).listen(3001)
