
// this context
const thisContext = () => {
  const obj1 = { id: 1, fn: function() { console.log(this.id) }}
  const obj2 = { id: 2, fn: obj1.fn}
  
  obj1.fn()
  obj2.fn()  
}
//thisContext()

// call context

const callContext = () => {
  const obj1 = { id: 1}
  const obj2 = { id: 2}
  const regularFn = function(obj) { console.log(this.id) }
  const lambdaFn = obj => console.log(this.id)

  regularFn.call(obj1)
  regularFn.call(obj2)
  lambdaFn.call(obj1)
  lambdaFn.call(obj2)
}
//callContext()

const checkPrototype = () => {
  function regularFn() {}
  const lambdaFn = () => {}

  console.log(typeof regularFn.prototype)
  console.log(typeof lambdaFn.prototype)
}
checkPrototype()
