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

const run = () => example4()
run()

