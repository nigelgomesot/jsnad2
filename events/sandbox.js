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


// remove listener
const example9 = () => {
  const ee = new EventEmitter()

  const listener1 = () => console.log('event listener: 1')
  const listener2 = () => console.log('event listener: 2')

  setInterval(() => ee.emit('my-event'), 200)

  ee.on('my-event', listener1)
  ee.on('my-event', listener2)

  setTimeout(() => ee.removeListener('my-event', listener1), 500)
  setTimeout(() => ee.removeListener('my-event', listener2), 1100)
}

// removeAllListener
const example10 = () => {
  const ee = new EventEmitter()

  ee.on('my-event1', () => console.log('my-event1 listener: 1'))
  ee.on('my-event1', () => console.log('my-event1 listener: 2'))
  ee.on('my-event2', () => console.log('my-event2 listener: 1'))
  ee.on('my-event3', () => console.log('my-event3 listener: 1'))

  setInterval(() => {
    ee.emit('my-event1')
    ee.emit('my-event2')
    ee.emit('my-event3')
  }, 200)

  setTimeout(() => ee.removeAllListeners('my-event2'), 500)
  setTimeout(() => ee.removeAllListeners(), 1100)
}


// unhandled error event
const example11 = () => {
  const ee = new EventEmitter()

  ee.emit('error', new Error('unhandled error'))
}

// handled error event
const example12 = () => {
  const ee = new EventEmitter()

  ee.on('error', err => console.log(err.message))
  ee.emit('error', new Error('handled error'))
}

const run = () => {
  example12()
}
run()
