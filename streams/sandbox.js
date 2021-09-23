'use strict'

// Readable stream for file
const example1 = () => {
  const fs = require('fs')
  const readable = fs.createReadStream('./sandbox.txt')
  readable.on('data', data => console.log('data: ', data))
  readable.on('end', () => console.log('read completed'))
}

// Readable stream for array
const example2 = () => {
  const { Readable } = require('stream')
  const createReadableStream = () => {
    const data = ['A', 'B', 'C', 'D']

    return new Readable({
      read() {
        if (data.length === 0)
          this.push(null)
        else
          this.push(data.shift())
      }
    })
  }

  const readable = createReadableStream()
  readable.on('data', data => console.log('data received:', data))
  readable.on('end', () => console.log('reading completed'))
}

const run = () => example2()
run()

