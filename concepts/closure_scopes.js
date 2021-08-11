// simple exmaple: access vaariable from parent scope
function ex1() {
  let value = false

  function log() { console.log('value is:', value)}
  log()

  value = true
  log()
}
ex1()

// closure scope specific per instance of the function
function ex2() {
  function init(type) {
    let id = 0

    return name => {
      id++

      return {id: id, type: type, name: name}
    }
  }

  const createUser = init('user'),
        createBook = init('book'),
        jane = createUser('jane'),
        john = createUser('john'),
        book1 = createBook('book1')

  console.log(jane)
  console.log(john)
  console.log(book1)
}
ex2()


// prototypal inheritance alternative
function ex3() {
  function wolf(name) {
    const howl = () => console.log(name, ' :', 'howl')

    return {howl: howl}
  }

  function dog(name) {
    name = name + " the dog"

    const woof = () => console.log(name, " :", 'woof')

    return {
      ...wolf(name),
      woof: woof
    }
  }

  const tommy = dog('tommy')
  tommy.woof()
  tommy.howl()
}
ex3()
