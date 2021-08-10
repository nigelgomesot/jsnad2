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
functional2()
