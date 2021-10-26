'use strict'

const os = require('os')

// os basic
const example1 = () => {
  
  console.log('os.hostname()', os.hostname())
  console.log('os.homedir()', os.homedir())
  console.log('os.tmpdir()', os.tmpdir())
  console.log('os.platform()', os.platform())
  console.log('os.type()', os.type())
}

// os stats
const example2 = () => {
  let intervalId,
      count = 0

  const printStats = () => {
    if (count === 5)
      return clearInterval(intervalId)

    console.group(count)
    console.log('os.uptime()', os.uptime())
    console.log('os.freemem()', os.freemem())
    console.log('os.totalmem()', os.totalmem())
    console.groupEnd()
    count++
  }

  intervalId = setInterval(printStats, 1000)
}

const run = () => example2()
run()

