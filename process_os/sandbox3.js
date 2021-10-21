'use strict'

// exiting
const example1 = () => {
  setInterval(() => console.log('interval of 500'), 500)
  setTimeout(() => {
    console.warn('timed out')
    //process.exit()
    process.exit(1)
  },1850)
}

// setting process.exitCode
const example2 = () => {
  setInterval(() => {
    console.log('interval of 500')
    process.exitCode = 1
  }, 500)
  setTimeout(() => {
    console.warn('timed out')
    process.exit()
  },1850)
}

// action on `exit` event
const example3 = () => {
  setInterval(() => {
    console.log('interval of 500')
    process.exitCode = 1
  }, 500)
  setTimeout(() => {
    console.warn('timed out')
    process.exit()
  },1850)

  process.on('exit', code => console.log(`exiting process with code ${code}`))
}

// process properties
const example4 = () => {
  console.log('process.platform', process.platform)
  console.log('process.pid', process.pid)
  console.log('process.cwd()', process.cwd())
  console.log('process.env', process.env)

  console.log('changing dir...')
  process.chdir('process_os')

  console.log('process.cwd()', process.cwd())
  console.log('process.env', process.env)
}

const run = () => example4()
run()
