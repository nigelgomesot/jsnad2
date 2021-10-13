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

// callback based operations
const example6 = () => {
  const { join } = require('path')
  const { readFile, writeFile } = require('fs')

  // read as buffer
  readFile(join(__dirname, 'in.txt'), (err, bufferContents) => {
    if (err)
      return console.error('read error occurred:', err.message)

    console.log('bufferContents:', bufferContents)
  })

  // read as utf8
  readFile(join(__dirname, 'in.txt'), {encoding: 'utf8'}, (err, contents) => {
    if (err)
      return console.error('read error occurred:', err.message)

    console.log('contents:', contents)
  })

  const contents = "THIS IS TEST CONTENT \n"

  //write contents
  setTimeout(() => {
    writeFile(join(__dirname, 'out.txt'), contents, err => {
      if (err)
        console.error('write error occurred:', err.message)
    })
  , 1000})

  //append contents
  setTimeout(() => {
    writeFile(join(__dirname, 'out.txt'), "THIS IS TEST CONTENT APPENDED \n", {'flag': 'a'}, err => {
      if (err)
        console.error('write error occurred:', err.message)
    })
  , 2000})

  // error handling
  readFile(join(__dirname, 'invalid-file.txt'), {encoding: 'utf8'}, (err, contents) => {
    if (err)
      return console.error('read error occurred:', err.message)

    console.log('contents:', contents)
  })
}

// promised based operations
const example7 = () => {
  const { join } = require('path')
  const { readFile, writeFile } = require('fs').promises

  // read as buffer
  const fn1 = async () => {
    const bufferContents = await readFile(join(__dirname, 'in.txt'))
    console.log('bufferContents:', bufferContents)
  }
  fn1().catch(console.error)

  // read as utf8
  const fn2 = async () => {
    const contents = await readFile(join(__dirname, 'in.txt'), {encoding: 'utf8'})
    console.log('contents:', contents)
  }
  fn2().catch(console.error)

  // write contents
  const fn3 = async () => {
    await writeFile(join(__dirname, 'out.txt'), "this is test data via promises \n")
    console.log('write completed')
  }
  setTimeout(() => fn3().catch(console.error), 1000)

  // append contents
  const fn4 = async () => {
    await writeFile(join(__dirname, 'out.txt'), "this is test data appended via promises\n", {'flag': 'a'})
    console.log('append completed')
  }
  setTimeout(() => fn4().catch(console.error), 2000)

  // error handling
  const fn5 = async () => {
    const bufferContents = await readFile(join(__dirname, 'invalid-file.txt'))
    console.log('bufferContents:', bufferContents)
  }
  fn5().catch(err => console.error('error occurred:', err.message))
}

// stream based operations
const example8 = () => {
  const { pipeline } = require('stream')
  const { join } = require('path')
  const { createReadStream, createWriteStream } = require('fs')

  pipeline(
    createReadStream(join(__dirname, 'in.txt')),
    createWriteStream(join(__dirname, 'out.txt')),
    err => {
      if (err)
        return console.error('stream error occurred:', err.message)

      console.log('completed.')
    }
  )
}

const example9 = () => {
  const { pipeline, Transform } = require('stream')
  const { join } = require('path')
  const { createReadStream, createWriteStream } = require('fs')

  const createTransformStream = () => {
    return new Transform({
      transform(chunk, enc, next) {
        const upperCased = chunk.toString().toUpperCase()
        next(null, upperCased)
      }
    })
  } 
  
  pipeline(
    createReadStream(join(__dirname, 'in.txt')),
    createTransformStream(),
    createWriteStream(join(__dirname, 'out.txt')),
    err => {
      if (err)
        return console.error('stream error occurred:', err.message)

      console.log('completed.')
    }
  )
}

// reading directories: sync
const example10 = () => {
  const { readdirSync } = require('fs')

  try {
    console.log(readdirSync(__dirname))
  } catch (err) {
    console.error('error occurred:', err.message)
  }

  try {
    console.log(readdirSync('/invalid-dir'))
  } catch (err) {
    console.error('error occurred:', err.message)
  }
}

// reading directories: callback
const example11 = () => {
  const { readdir } = require('fs')

  readdir(__dirname, (err, files) => {
    if (err)
      return console.error('error occurred:', err.message)

    console.log(files)
  })

  readdir('/invalid-dir', (err, files) => {
    if (err)
      return console.error('error occurred:', err.message)

    console.log(files)
  })
}

// reading directories: promises
const example12 = () => {
  const { readdir: readdirPromise } = require('fs').promises

  const run = async () => {
    const files =  await readdirPromise(__dirname)
    console.log(files)
  }

  run().catch(err => console.error('error occurred:', err.message))

  const run2 = async () => {
    const files =  await readdirPromise('/invalid-dir')
    console.log(files)
  }

  run2().catch(err => console.error('error occurred:', err.message))
}

// stream operations
const example13 = () => {
  const { createServer } = require('http')
  const { Readable, Transform, pipeline } = require('stream')
  const { opendir } = require('fs')

  const createEntryTransform = () => {
    let syntax = '[\n'

    return new Transform({
      writableObjectMode: true,
      readableObjectMode: false,
      transform(entry, enc, next) {
        next(null, `${syntax} ${entry.name}`)
        syntax = ',\n'
      },
      final(cb) {
        this.push('\n]\n')
        cb()
      }
    })
  }

  createServer((req, res) => {
    if (req.url !== '/') {
      res.statusCode = 404
      res.end('Not Found')
      return
    }

    opendir(__dirname, (err, dir) => {
      if (err) {
        res.statusCode = 500
        res.end('Server error')
        return
      }

      const dirStream = Readable.from(dir)
      const entryTransform = createEntryTransform()

      pipeline(dirStream, entryTransform, res, (err) => {
        if (err) {
          console.error('error occurred:', err.message)
        }
      })
    })
  }).listen(3001)
}

// metadata
const example14 = () => {
  const { readdirSync, statSync } = require('fs')
  const files =  readdirSync('.')

  for (const name of files) {
    const stat = statSync(name)
    const label = stat.isDirectory() ? 'dir': 'file'
    const { atime, birthtime, ctime, mtime } = stat
    console.group(label, ':', name)
    console.log('atime:', atime.toLocaleString())
    console.log('birthtime:', birthtime.toLocaleString())
    console.log('ctime:', ctime.toLocaleString())
    console.log('mtime:', mtime.toLocaleString())
    console.groupEnd()
    console.log()
  }
}

const run = () => example14()
run()

