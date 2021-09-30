'use strict'

const net = require('net')
net.createServer(socket => {
  const beatInterval = setInterval(() => {
    socket.write('beat')
  }, 1000)

  socket.on('data', data => socket.write(data.toString().toUpperCase()))

  socket.on('end', () => clearInterval(beatInterval))

}).listen(3001)
