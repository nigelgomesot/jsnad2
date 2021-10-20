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

const run = () => example3()
run()
