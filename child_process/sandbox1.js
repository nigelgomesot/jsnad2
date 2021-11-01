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

// spawnSync
const example6 = () => {
  const { spawnSync } = require('child_process')

  const result = spawnSync(
    process.execPath,
    ['-e', `console.log('subprocess stdout')`]
  )

  console.log(result)
  console.log(result.stdout.toString())
}

// spawnSync with subprocess non 0 exit code
const example7 = () => {
  const { spawnSync } = require('child_process')

  const result = spawnSync(
    process.execPath,
    ['-e', `process.exit(1)`]
  )

  console.log(result)
  console.log(result.stderr.toString())
}

// spawnSync with subprocess with error
const example8 = () => {
  const { spawnSync } = require('child_process')

  const result = spawnSync(
    process.execPath,
    ['-e', `throw new Error('stderr error.')`]
  )

  console.log(result)
  console.log(result.stderr.toString())
}

// spawn
const example9 = () => {
  const { spawn } = require('child_process')

  const sp = spawn(
    process.execPath,
    ['-e', `console.log('subprocess stdout.')`]
  )

  console.log('pid:', sp.pid)
  sp.stdout.pipe(process.stdout)
  sp.on('close', status => console.log('subprocess exit status:', status))
}

// spawn with subprocess non 0 exit code
const example10 = () => {
  const { spawn } = require('child_process')

  const sp = spawn(
    process.execPath,
    ['-e', `process.exit(1)`]
  )

  console.log('pid:', sp.pid)
  sp.stdout.pipe(process.stdout)
  sp.on('close', status => console.log('subprocess exit status:', status))
}

// exec as an instance
const example11 = () => {
  const { exec }= require('child_process')

  const i = exec(
    `${process.execPath} -e "console.log('subprocess stdout')"`
  )

  console.log('pid:', i.pid)
  i.stdout.pipe(process.stdout)
  i.on('close', status => console.log('subprocess exit status:', status))
}

const run = () => example11()
run()
