'use strict'

const os = require('os')

setTimeout(() => {
  const stats = process.memoryUsage()
  console.log(process.uptime()) // TODO output uptime of process
  console.log(os.uptime()) // TODO output uptime of OS
  console.log(os.totalmem()) // TODO output total system memory
  console.log(stats.heapTotal) // TODO output total heap memory
}, 1000)