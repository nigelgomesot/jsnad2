
const example1 = () => {
  const { promisify } =  require('util')
  const { readFile } = require('fs')

  const readFilePromise = promisify(readFile)

  const promise = readFilePromise('./example.txt')

  promise
    .then(contents => {
      console.log(contents.toString())
    })
    .catch(err => {
    console.error(err)
  })
}
//example1()

const example2 = () => {
  const { readFile } = require('fs').promises

  readFile('./example.txt')
    .then(contents => {
      return contents.toString()
    })
    .then(contentString => {
      console.log(contentString)
    })
    .catch(console.error)
}
example2()
