
// instanceof
const example1 = () => {
  const buffer = Buffer.alloc(10)
  console.log('buffer', buffer)
  console.log('buffer instanceof Buffer:', buffer instanceof Buffer)
  console.log('buffer instanceof Uint8Array:', buffer instanceof Uint8Array)
}

// slice method diff b/w Buffer & Uint8Array
const example2 = () => {
  let buf1, buf2, buf3, buf4

  buf1 = Buffer.alloc(10)
  console.log('old buf1:', buf1)
  buf2 = buf1.slice(2, 3)
  console.log('old buf2:', buf2)

  buf2[0] = 100
  console.log('new buf1:', buf1)
  console.log('new buf2:', buf2)

  buf3 = new Uint8Array(10)
  console.log('old buf3:', buf3)
  buf4 = buf3.slice(2, 3)
  console.log('old buf4:', buf4)

  buf4[0] = 100
  console.log('new buf3:', buf3)
  console.log('new buf4:', buf4)
}

// buffer allocation
const example3 = () => {
  buf1 = new Buffer(10)
  buf2 = Buffer.alloc(10)
  buf3 = Buffer.allocUnsafe(10)
  buf4 = Buffer.allocUnsafe(10)

  console.log('Buffer new:', buf1)
  console.log('Buffer alloc:', buf2)
  console.log('Buffer allocUnsafe 1:', buf3)
  console.log('Buffer allocUnsafe 2:', buf4)
}

// convert string to buffers
const example4  = () => {
  const lengthDiff = () => {
    const a = 'A',
          aBuffer = Buffer.from('A'),
          eyes = '👀',
          eyesBuffer = Buffer.from('👀')

    console.log('lengthDiff')
    console.group('')
    console.log('a length:', a.length)
    console.log('aBuffer:', aBuffer)
    console.log('aBuffer length:', aBuffer.length)
    console.log('eyes length:', eyes.length)
    console.log('eyesBuffer:', eyesBuffer)
    console.log('eyesBuffer length:', eyesBuffer.length)
    console.groupEnd('')
  }
  lengthDiff()

  const encodings = () => {
    console.log('encodings')
    const utf8Encoded = Buffer.from('👀'),
          utf16leEncoded = Buffer.from('👀', 'utf16le')

    console.group('character encodings')
    console.log('utf8Encoded :', utf8Encoded)
    console.log('utf16leEncoded :', utf16leEncoded)
    console.groupEnd('character encodings')

    const base64Encoded = Buffer.from('8J+RgA==', 'base64')

    console.group('binary to text encodings')
    console.log('utf8Encoded :', utf8Encoded)
    console.log('base64Encoded :', base64Encoded)
    console.groupEnd('binary to text encodings')
  }
  encodings()
}

// convert buffers to strings
const example5 = () => {
  const buffer = Buffer.from('👀')

  console.group('basic methods')
  console.log('buffer: ', buffer)
  console.log('buffer.toString(): ', buffer.toString())
  console.log('buffer concatenate with string:')
  console.log(buffer + '')
  console.groupEnd('basic methods')

  console.group('encoding')
  console.log('buffer: ', buffer)
  console.log("buffer.toString('hex'): ", buffer.toString('hex'))
  console.log("buffer.toString('base64'): ", buffer.toString('base64'))
  console.groupEnd('encoding')

  console.group('string_decoder')
  const { StringDecoder } = require('string_decoder')
  
  const bufferFrag1 = Buffer.from('f09f', 'hex')
  console.log('bufferFrag1: ', bufferFrag1)
  
  const bufferFrag2 = Buffer.from('9180', 'hex')
  console.log('bufferFrag2: ', bufferFrag2)

  const decoder = new StringDecoder()
  console.log('write frag1: ', decoder.write(bufferFrag1))
  console.log('write frag2: ', decoder.write(bufferFrag2))
  console.groupEnd('string_decoder')
}

// de/serialization of json & buffer
const example6 = () => {
  const buffer = Buffer.from('👀')
  const json = JSON.stringify(buffer)
  console.log('json:', json)
  console.log('json constructor name:', json.constructor.name)
  const parsed = JSON.parse(json)
  console.log('parsed:', parsed)
  console.log('parsed constructor name:', parsed.constructor.name)
  const bufferNew = Buffer.from(parsed.data)
  console.log('bufferNew:', bufferNew)
}

const run = () => {
  example6()
}
run()
