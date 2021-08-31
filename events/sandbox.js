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
