import Dep from './Dep'

class Watcher {
  constructor(data) {
    this.target = null
    let self = this
    let deps = new Map()
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