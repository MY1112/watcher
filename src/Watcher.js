import Dep from './Dep'

class Watcher {
  constructor(data) {
    this.target = null
    let self = this
    let deps = new Map()
    let handler = {
      get(obj, key, receiver) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          return new Proxy(obj[key], handler)
        }
        deps.get(key).depend(self.target)
        return Reflect.get(obj, key, receiver)
      },
      set(obj, key, newValue, receiver) {
        obj[key] = newValue
        deps.get(key).notify(obj)
        return Reflect.set(obj, key, newValue, receiver)
      }
    }
    Object.keys(data).forEach(key => {
      deps.set(key, new Dep())
    })
    this.data = new Proxy(data, {
      get(obj, key) {
        deps.get(key).depend(self.target)
        return obj[key]
      },
      set(obj, key, newValue) {
        obj[key] = newValue
        deps.get(key).notify(obj)
        return true
      }
    })
  }
  event(func) {
    this.target = func
    this.target(this.data)
    this.target = null
  }
}

export default Watcher