'use strict'

// basic child I/O
const example1 = () => {
  const { execSync } = require('child_process')

  const output1 =  execSync(`node -e "console.log('subprocess stdio output.')"`)
  console.log(output1.toString())
  const output2 =  execSync(`node -e "console.error('subprocess stderr output.')"`)
  console.log(output2.toString())
}

// platform specific command
const example2 = () => {
  const { execSync } = require('child_process')

  const cmd = process.platform === 'win32' ? 'dir' : 'ls'
  const output = execSync(cmd)
  console.log(output.toString())
}


// ndoe execPath
const example3 = () => {
  const { execSync } = require('child_process')

  const execPath = process.execPath
  console.log('execPath:', execPath)
  const output1 =  execSync(`${execPath} -e "console.log('subprocess stdio output.')"`)
  console.log(output1.toString())
  
  try {
    execSync(`${execPath} -e "process.exit(1)"`)
  } catch(err) {
    console.error('error occurred:', err.message)
  }

  try {
    execSync(`${execPath} -e "throw new Error('monkey error')"`)
  } catch (err) {
      console.error('error occurred:', err.output)
  }
}


// exec (async)
const example4 = () => {
  const { exec } = require('child_process')

  exec(
    `${process.execPath} -e "console.log('A'); console.error('B')"`,
    (err, stdout, stderr) => {
      console.log('subprocess err:', err),
      console.log('subprocess stdout:', stdout),
      console.log('subprocess stderr:', stderr)
    }
  )
}

// exec with subprocess error
const example5 = () => {
  const { exec } = require('child_process')

  exec(
    `${process.execPath} -e "console.log('A'); throw new Error('B error')"`,
    (err, stdout, stderr) => {
      console.log('subprocess err:', err),
      console.log('subprocess stdout:', stdout.toString()),
      console.log('subprocess stderr:', stderr.toString())
    }
  )
}
const run = () => example5()
run()
