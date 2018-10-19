let data = { name: 'sam', age: 18 }
let target = null

// Dep 类, 用于做依赖收集
class Dep {
  constructor() {
    this.subscribers = []
  }
  depend() {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target)
    }
  }
  notify() {
    this.subscribers.forEach(callback => callback())
  }
}

// 对数据做监听
Object.keys(data).forEach(key => {
  // 保存初始值
  var initValue = data[key]
  // 生产依赖收集实例, 用于后续数据 get 时收集依赖
  const dep = new Dep()
  Object.defineProperty(data, key, {
    get() {
      dep.depend()
      return initValue
    },
    set(newValue) {
      initValue = newValue
      dep.notify()
    }
  })
})

function watcher(func) {
  target = func
  target()
  target = null
}

// 添加回调
watcher(() => {
  let info = `my name is ${data.name}, and i'm ${data.age}`
  console.log(info)
})
watcher(() => {
  let info = `my age is ${data.age}, and my name is ${data.name}`
  console.log(info)
})