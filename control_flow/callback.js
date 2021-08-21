const { readFile } = require('fs')
const series = require('fastseries')()

const [file1, file2, file3] = ['./example.txt', './example.txt', './example.txt']

const print = (err, contents) => {
  if (err) {
    console.error(err)

    return
  }

  console.log(contents.toString())
}

const parallel = () => {
  readFile(file1, print)
  readFile(file2, print)
  readFile(file3, print)
}
//parallel()


const serial = () => {
  readFile(file1, (err, contents) => {
    console.log('print file1')
    print(err, contents)

    readFile(file2, (err, contents) => {
      console.log('print file2')
      print(err, contents)

      readFile(file3, (err, contents) => {
        console.log('print file3')
        print(err, contents)
      })
    })
  })
}
//serial()

const serial2 = () => {
  const data = []

  readFile(file1, (err, contents) => {
    if (err)
      print(err)
    else
      data.push(contents)

    readFile(file2, (err, contents) => {
      if (err)
        print(err)
      else
        data.push(contents)

      readFile(file3, (err, contents) => {
        if (err)
          print(err)
        else
          data.push(contents)

        print(Buffer.concat(data).toString())
      })
    })
  })
}
//serial2()

const serial3 = () => {
  const files = [file1, file2, file3]
  let index = 0,
      data = []

  const read = index => {
    readFile(files[index], (err, contents) => {
      if (err)
        print(err)
      else {
        data.push(contents)
        index++

        if (index === files.length)
          print(Buffer.concat(data).toString())
        else
          read(index)
      }
    })
  }

  read(index)
}
//serial3()

const serial4 = () => {
  const files = [file1, file2, file3]

  const readers = files.map(file => {
    return (_, cb) => {
      readFile(file, (err, contents) => {
        if (err) {
          print(err)
          cb(null, Buffer.alloc(0))
        } else {
          cb(null, contents)
        }
      })
    }
  })

  series(null, readers, null, print)
}
serial4()
