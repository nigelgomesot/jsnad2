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

// process stats
const example5 = () => {
  console.log('process uptime:', process.uptime())

  setTimeout(() => {
    console.log('process uptime:', process.uptime())
  }, 1000)
}

const example6 = () => {
  const outputStats = () => {
    const uptime = process.uptime()
    const {user, system} = process.cpuUsage()

    console.log(uptime, user, system, (user + system)/ 1000000)
  }

  outputStats()

  setTimeout(() => {
    outputStats()

    const now = Date.now()

    while (Date.now() - now < 5000) {/* do something */}
    outputStats()
  }, 500)
}

// process memoryUsage
const example7 = () => {
  const stats = [process.memoryUsage()]

  let iterations = 5

  while (iterations--) {
    let i = 10000
    const arr = []

    while (i--)
      arr.push({[Math.random()]: Math.random()})

    stats.push(process.memoryUsage())
  }

  console.table(stats)
}

const run = () => example7()
run()
