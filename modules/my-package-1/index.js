'use strict'

const pino = require('pino')
const format = require('./format')
const logger = pino()
logger.info(format.upper('my-package started'))
logger.info(format.upper({a: 'a'}))

process.stdin.resume()
