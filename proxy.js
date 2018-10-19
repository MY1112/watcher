let data = { name: 'sam', age: 18 }
let target = null
let proxyData = data
let deps = new Map()

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


// 为每个值设置一个依赖收集器
Object.keys(data).forEach(key => {
  deps.set(key, new Dep())
})

// 对数据做监听
data = new Proxy(proxyData, {
  get(obj, key) {
    deps.get(key).depend()
    return obj[key]
  },
  set(obj, key, newValue) {
    obj[key] = newValue
    deps.get(key).notify()
  }
})

// 触发器
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