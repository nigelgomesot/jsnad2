'use strict'

const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
    console.log('a user connected')

    socket.on('chat-message', msg => {
        console.log('message:', msg)
    })

    socket.on('disconnect', () => {
        console.log('a user disconnected')
    })
})

server.listen(3001, () => {
    console.log('listening on *:3001')
})
