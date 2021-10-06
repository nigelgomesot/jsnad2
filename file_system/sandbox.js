'use strict'

// basic file/dir variables
const example1 = () => {
  console.log('__dirname:', __dirname)
  console.log('__filename:', __filename)
}

// path builders: join
const example2 = () => {
  const { join } = require('path')
  console.log('join:', join(__dirname, 'out.txt'))
  console.log('join:', join(__dirname, 'subdir1', 'subdir2', 'out.txt'))
}

// path builders: others
const example3 = () => {
  const path = require('path')

  console.log('isAbsolute:', path.isAbsolute('~/Desktop'))
  console.log('isAbsolute:', path.isAbsolute('/etc'))

  console.log('resolve:', path.resolve('/home', 'b', 'c'))
  
  console.log('normalize:', path.normalize('/home/../a//b'))

  console.log('format:', path.format(path.parse(__filename)))
}

// path desconstructors
const example4 = () => {
  const { parse, basename, dirname, extname } = require('path')

  console.log('parsed:', parse(__filename))
  console.log('basename:', basename(__filename))
  console.log('dirname:', dirname(__filename))
  console.log('extname:', extname(__filename))
}

// synchronous based operations
const example5 = () => {
  const { join } = require('path')
  const { readFileSync, writeFileSync } = require('fs')

  // read as buffer(default)
  const bufferContents = readFileSync(join(__dirname, 'in.txt'))
  console.log('bufferContents:', bufferContents)

  // read as utf8
  const contents = readFileSync(join(__dirname, 'in.txt'), {encoding: 'utf8'})
  console.log('contents:', contents)

  // write contents
  writeFileSync(join(__dirname, 'out.txt'), contents.toUpperCase())

  // append contents
  writeFileSync(join(__dirname, 'out.txt'), contents.toUpperCase(), {flag: 'a'})

  // error handlings
  try {
    readFileSync(join(__dirname,'invalid-file.txt'))
  } catch(err) {
    console.error('error occurred:', err.message)
  }
}


const run = () => example5()
run()

