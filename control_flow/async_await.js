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
example2()
