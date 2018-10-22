import Watcher from '../src/index'

let data = { name: 'sam', age: 18, BWH: [1, 2, 3] }
let watcher = new Watcher(data)
watcher.event(function (data) {
  let info = `${data.name} is ${data.age}`
  console.log(info)
})
watcher.event(function (data) {
  console.log('age ' + data.age)
  console.log('BWH ' + data.BWH)
})

document.querySelector('#button').addEventListener('click', function () {
  watcher.data.age += 1
  watcher.data.BWH[0] = Math.random()
})