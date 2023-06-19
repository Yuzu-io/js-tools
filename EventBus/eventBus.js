import uuid from '../UUID/uuid';

class EventBus {
  constructor() {
    this.eventObj = {} // 存储订阅事件
  }
  // 订阅事件
  $on (name, callback) {
    if (!this.eventObj[name]) {
      this.eventObj[name] = {}
    }
    const key = uuid()
    this.eventObj[name][key] = callback
    return key
  }
  // 订阅事件，只执行一次
  $once (name, callback) {
    if (!this.eventObj[name]) {
      this.eventObj[name] = {}
    }
    const key = "D+" + uuid()
    this.eventObj[name][key] = callback
    return key
  }
  // 发布事件
  $emit (name, ...params) {
    const eventObj = this.eventObj[name]
    for (const key in eventObj) {
      eventObj[key](...params)
      if (key.indexOf("D+") !== -1) {
        delete this.eventObj[name][key]
        if (!Object.keys(this.eventObj[name]).length) {
          delete this.eventObj[name]
        }
      }
    }
  }
  // 取消订阅
  $off (name, key) {
    delete this.eventObj[name][key]
    if (!Object.keys(this.eventObj[name]).length) {
      delete this.eventObj[name]
    }
  }
}

export default EventBus;