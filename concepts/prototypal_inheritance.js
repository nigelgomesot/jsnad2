// functional

const functional1 = () => {
  const wolf = {
    howl: function () { console.log(this.name, ':', 'howl') }
  }

  const dog = Object.create(wolf, {
    woof: { value: function() { console.log(this.name, ':', 'woof') }}
  })

  function createDog (name) {
    return Object.create(dog, { name: { value: name + ' the dog'}})
  }

  const tommy = createDog('tommy')
  tommy.woof()
  tommy.howl()

  console.log(Object.getPrototypeOf(tommy) === dog)
  console.log(Object.getPrototypeOf(dog) === wolf)
  console.log(Object.getPrototypeOf(wolf) === Object.prototype)
}
//functional1()


const functional2 = () => {
  const animal = {
    speak: function() { console.log(this.name, ':', 'speak')}
  }

  const man = Object.create(animal, {talk:  {value: function() { console.log(this.name, ':', 'Hi!')}}})

  function createMan(name) {
    return Object.create(man, {name: {value: name + ' the Human'}})
  }

  const ben = createMan('Ben')
  ben.talk()
  ben.speak()

  console.log(Object.getPrototypeOf(ben) === man)
  console.log(Object.getPrototypeOf(man) === animal)
  console.log(Object.getPrototypeOf(animal) === Object.prototype)
}
//functional2()


// class-synatx constructors

class Animal {
  constructor(name) {
    this.name = name
  }

  speak() {
    console.log(this.name, ' :', 'speak')
  }
}

class Ape extends Animal {
  constructor(name) {
    super(name + ' an ape')
  }

  call() {
    console.log(this.name, ' :', 'ooo ooo ooo')
  }
}

class Human extends Ape {
  constructor(name) {
    super(name + ' now a human earlier')
  }

  talk() {
    console.log(this.name, ' :', 'Hi!')
  }
}

human = new Human('Ben')
human.talk()
human.call()
human.speak()
console.log(Object.getPrototypeOf(human) === Human.prototype)
console.log(Object.getPrototypeOf(Human.prototype) === Ape.prototype)
console.log(Object.getPrototypeOf(Ape.prototype) === Animal.prototype)
console.log(Object.getPrototypeOf(Animal.prototype) === Object.prototype)

