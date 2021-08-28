const { readFile } = require('fs').promises

const example1 = () => {
  async function run() {
    const contents = await readFile('./example.txt')
    console.log(contents.toString())
  }

  run().catch(console.error)
}
//example1()

// serial execution
const example2 = () => {
  const print = contents => console.log(contents.toString())

  const [file1, file2, file3] = new Array(3).fill('./example.txt')

  async function run() {
    const data = [
      await readFile(file1),
      await readFile(file2),
      await readFile(file3),
    ]

    print(Buffer.concat(data))
  }

  run().catch(console.error)
}
//example2()

// serial execution (dynamic array files)
const example3 = () => {
  const print = contents => console.log(contents.toString())

  const files =  new Array(3).fill('./example.txt')

  async function run() {
    const data = []

    for (const file of files)
      data.push(await readFile(file))

    print(Buffer.concat(data))
  }

  run().catch(console.error)
}
//example3()

// parallel execution
const example4 = () => {
  const print = contents => console.log(contents.toString())

  const files = new Array(3).fill('./example.txt')

  async function run() {
    const readers = files.map(file => readFile(file))
    const data = await Promise.all(readers)

    print(Buffer.concat(data))
  }

  run().catch(console.error)
}
// example4()

// parallel execution (allSettled)
example5 = () => {
  //const files =  new Array(3).fill('./example.txt')
  const files = ['./example.txt', './examples.txt', './example.txt']

  const print = contents => console.log(contents.toString())

  async function run () {
    const readers = files.map(file => readFile(file))

    const results = await Promise.allSettled(readers)

    results
      .filter(({status}) => status === 'rejected')
      .forEach(({reason}) => console.error(reason))

    const data = results
                  .filter(({status}) => status === 'fulfilled')
                  .map(({value}) => value)

    print(Buffer.concat(data))
  }

  run().catch(console.error)
}
// example5()

// parallel callback wrapped in promise
const example6 = () => {
  const { promisify } = require('util')
  const { readFile } = require('fs')
  //const [file1, file2, file3] = new Array(3).fill('./example.txt')
  const [file1, file2, file3] = ['./example.txt', './examples.txt', './example.txt']

  const read = promisify(cb => {
    let index = 0

    const print = (err, contents) => {
      index++

      if (err) {
        console.error(err)
        if (index === 3)
          cb()

        return
      }

      console.log(contents.toString())

      if (index === 3)
        cb()
    }

    readFile(file1, print)
    readFile(file2, print)
    readFile(file3, print)
  })

  async function run() {
    const done = () => console.log('done.')

    await read(done)
  }

  run().catch(console.error)
}
example6()

