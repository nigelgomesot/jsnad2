'use strict'

const net = require('net')
const socket = net.connect(3001)

socket.on('data', data => console.log('data received:', data.toString()))

socket.write('hello')

setTimeout(() => {
  socket.write('client done.')
  socket.end()
  //setTimeout(() => socket.end(), 0)
}, 3250)
