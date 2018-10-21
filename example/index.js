import Watcher from '../src/index'

let data = { name: 'sam', age: 18 }
let watcher = new Watcher(data)
watcher.event(function (data) {
  let info = `${data.name} is ${data.age}`
  console.log(info)
})
watcher.event(function (data) {
  console.log('fuck' + data.age)
})

document.querySelector('#button').addEventListener('click', function () {
  watcher.data.age += 1
})