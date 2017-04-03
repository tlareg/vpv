import _ from 'lodash'

class StorageHelper {
  constructor() {
    this.STORAGE_KEY = `VPV`
    this.storage = {}
  }

  pull() {
    const storageStr = window.localStorage[this.STORAGE_KEY] || '{}'
    this.storage = JSON.parse(storageStr)
  }

  push() {
    window.localStorage[this.STORAGE_KEY] = JSON.stringify(this.storage)
  }

  set(path, val) {
    this.pull()
    _.set(this.storage, path, val)
    this.push()
  }

  get(path) {
    this.pull()
    return _.get(this.storage, path)
  }
}

const storageHelper = new StorageHelper()
export default storageHelper