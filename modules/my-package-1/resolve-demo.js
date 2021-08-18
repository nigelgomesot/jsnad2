'use strict'

console.log()
console.group('# package resolution')
console.log(`require('pino')`, '=>', require.resolve('pino'))
console.log(`require('standard')`, '=>', require.resolve('standard'))
console.groupEnd()
console.log()

console.log()
console.group('# directory resolution')
console.log(`require('.')`, '=>', require.resolve('.'))
console.log(`require('../my-package-1')`, '=>', require.resolve('../my-package-1'))
console.groupEnd()
console.log()

console.log()
console.group('# file resolution')
console.log(`require('./format')`, '=>', require.resolve('./format'))
console.log(`require('./format.js')`, '=>', require.resolve('./format.js'))
console.groupEnd()
console.log()

console.log()
console.group('# core API resolution')
console.log(`require('fs')`, '=>', require.resolve('fs'))
console.log(`require('util')`, '=>', require.resolve('util'))
console.groupEnd()
console.log()
