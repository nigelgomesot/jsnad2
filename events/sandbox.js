const EventEmitter = require('events')

class MyEmitter extends EventEmitter {
  constructor(opts = {}) {
    super(opts)
    this.name = opts.name
  }

  destroy(err) {
    if (err)
      { this.emit('error', err) }

    this.emit('close')
  }
}

// basic emitter
const example1 = () => {
  const ee = new EventEmitter()
  ee.on('close', () => console.log('close event emitted.'))
  ee.emit('close')
}

// basic emitter via addListener
const example2 = () => {
  const ee = new EventEmitter()
  ee.addListener('close', () => console.log('close event emitted.'))
  ee.emit('close')
}

// basic with args
const example3 = () => {
  const ee = new EventEmitter()
  ee.on('add', (a, b) => console.log(`sum is ${a + b}`))
  ee.emit('add', 1, 2)
}

// ordering
const example4 = () => {
  const ee = new EventEmitter()
  ee.emit('close')
  ee.on('close', () => console.log('close event emitted'))
}

// emit order
const example5 = () => {
  const ee = new EventEmitter()
  ee.on('my-event', () => console.log('my-event emitted 1st'))
  ee.on('my-event', () => console.log('my-event emitted 2nd'))
  ee.emit('my-event')
}

// emit order with prependListener
const example6 = () => {
  const ee = new EventEmitter()
  ee.on('my-event', () => console.log('my-event emitted 2nd'))
  ee.on('my-event', () => console.log('my-event emitted 3rd'))
  ee.prependListener('my-event', () => console.log('my-event emitted 1st'))
  ee.prependListener('my-event', () => console.log('my-event emitted 0th'))
  ee.emit('my-event')
}

// same event multiple emits
const example7 = () => {
  const ee = new EventEmitter()

  ee.on('my-event', id => console.log(`my-event emitted ${id}`))
  ee.emit('my-event', 1)
  ee.emit('my-event', 2)
  ee.emit('my-event', 3)
}

// same event one emits(once)
const example8 = () => {
  const ee = new EventEmitter()

  ee.once('my-event', id => console.log(`my-event emitted ${id}`))
  ee.emit('my-event', 1)
  ee.emit('my-event', 2)
  ee.emit('my-event', 3)
}

const run = () => {
  example8()
}
run()
