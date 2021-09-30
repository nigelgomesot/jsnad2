'use strict'

const net = require('net')
const { finished } = require('stream')
net.createServer(socket => {
  const beatInterval = setInterval(() => {
    socket.write('beat')
  }, 1000)

  socket.on('data', data => {
    socket.write(data.toString().toUpperCase())
  })

  finished(socket, err => {
    if (err)
      console.error('socket error:', error)
    else
      console.log('socket ended.')

    clearInterval(beatInterval)
  })
}).listen(3001)
