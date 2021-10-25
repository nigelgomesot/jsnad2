'use strict'

// os
const example1 = () => {
  const os = require('os')

  console.log('os.hostname()', os.hostname())
  console.log('os.homedir()', os.homedir())
  console.log('os.tmpdir()', os.tmpdir())
  console.log('os.platform()', os.platform())
  console.log('os.type()', os.type())
}

const run = () => example1()
run()

