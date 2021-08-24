
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
//example2()


// serial execution
const example3 = () => {
  const { readFile } = require('fs').promises
  const files = ['./example.txt', './example.txt', './example.txt'],
        data = []

  const print = contents => console.log(contents.toString())

  let count = files.length,
      index = 0

  const read = file => {
    return readFile(file).then(contents => {
      data.push(Buffer.from(index.toString()))
      data.push(contents)
      index++

      if (index < count)
        return read(files[index])

      return data
    })
  }

  read(files[index])
    .then(data => {
      print(Buffer.concat(data))
    })
    .catch(console.error)
}
//example3()


// parallel execution (Promise.all)
const example4 = () => {
  const { readFile } = require('fs').promises
  const files = ['./example.txt', './example.txt', './example.txt']

  const print = data => console.log(Buffer.concat(data).toString())

  const readers = files.map(file => readFile(file))

  Promise.all(readers)
    .then(print)
    .catch(console.error)
}
//example4()


// parallel execution (Promise.allSettled)
const example5 = () => {
  const { readFile } = require('fs').promises
  const files = ['./example.txt', './examples.txt', './example.txt']

  const print = results => {
    results
      .filter(({status}) => status === 'rejected')
      .forEach(({reason}) => console.error(reason))

    const data = results
                  .filter(({status}) => status === 'fulfilled')
                  .map(({value}) => value)

    const contents = Buffer.concat(data)

    console.log(contents.toString())
  }

  const readers = files.map(file => readFile(file))

  Promise.allSettled(readers)
    .then(print)
    .catch(console.error)
}
example5()

