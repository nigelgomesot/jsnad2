'use strict'

const net = require('net')
const socket = net.connect(3001)

socket.pipe(process.stdout)

socket.write('\nhello\n')

setTimeout(() => {
  socket.write('\bye.\n')

  setTimeout(() => {
    socket.end()
  }, 250)
}, 3250)

