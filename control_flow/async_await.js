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
example4()

