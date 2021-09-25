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

// Readable stream with encoding
const example3 = () => {
  const { Readable } = require('stream')

  const createReadableStream = () => {
    const data = ['A', 'B', 'C', 'D']

    return new Readable({
      encoding: 'utf8',
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

// Readable stream with objectMode
const example4 = () => {
  const { Readable } = require('stream')

  const createReadableStream = () => {
    const data = ['A', 'B', 'C', 'D']

    return new Readable({
      objectMode: true,
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

// Readable.from
const example5 = () => {
  const { Readable } = require('stream')

  const readable = Readable.from(['A', 'B', 'C'])
  readable.on('data', data => console.log('data received:', data))
  readable.on('end', () => console.log('reading completed'))
}


// Writable basic with file
const example6 = () => {
  const fs = require('fs')

  const writable = fs.createWriteStream('./write.out')
  writable.on('finish', () => console.log('write finished.'))
  writable.write('A\n')
  writable.write('B\n')
  writable.write('C\n')
  writable.end('end of file.')
}

// Writable with custom Writable stream
const example7 = () => {
  const { Writable } = require('stream')
  const createWritableStream = data => {
    return new Writable({
      decodeStrings: false,
      write(chunk, enc, next) {
        data.push(chunk)
        next()
      }
    })
  }

  const data = []
  const writable = createWritableStream(data)
  writable.on('finish', () => console.log('write finished.', data))
  writable.write('A\n')
  writable.write('B\n')
  writable.write('C\n')
  writable.end('end of array.')
}



const run = () => example7()
run()

