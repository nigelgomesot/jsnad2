
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

const run = () => {
  example2()
}
run()
