(function () {
  'use strict';

  class Dep$$1 {
    constructor() {
      this.subscribers = [];
    }
    depend(target) {
      if (target && !this.subscribers.includes(target)) {
        this.subscribers.push(target);
      }
    }
    notify(data) {
      this.subscribers.forEach(callback => {
        callback(data);
      });
    }
  }

  class Watcher {
    constructor(data) {
      this.target = null;
      let self = this;
      let deps = new Map();
      Object.keys(data).forEach(key => {
        deps.set(key, new Dep$$1());
      });
      this.data = new Proxy(data, {
        get(obj, key) {
          deps.get(key).depend(self.target);
          return obj[key]
        },
        set(obj, key, newValue) {
          obj[key] = newValue;
          deps.get(key).notify(obj);
          return true
        }
      });
    }
    event(func) {
      this.target = func;
      this.target(this.data);
      this.target = null;
    }
  }

  let data = { name: 'sam', age: 18 };
  let watcher = new Watcher(data);
  watcher.event(function (data) {
    let info = `${data.name} is ${data.age}`;
    console.log(info);
  });
  watcher.event(function (data) {
    console.log('fuck' + data.age);
  });

  document.querySelector('#button').addEventListener('click', function () {
    watcher.data.age += 1;
  });

}());
//# sourceMappingURL=bundle.js.map
