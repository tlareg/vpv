class Statement {
  constructor() {

  }
}

class LRS {
  constructor(lrsData) {
    Object.assign(this, {
      guid: getGuid()
    }, LRS.clone(lrsData));
  }

  static clone(lrs) {
    return [
      'guid',
      'name',
      'url',
      'username',
      'password',
      'xAPIVersion'
    ].reduce((acc, propName) => { 
      if (lrs[propName]) {
        acc[propName] = lrs[propName];
      }
      return acc;
    }, {});
  }

  clone() {
    return LRS.clone(this);
  }
}

class LRSList {
  constructor() {
    this.list = [];
  }

  getList() {
    return [...this.list];
  }

  getByGuid(guid) {
    const foundLrs = this.list.filter(lrs => lrs.guid === guid)[0];
    return foundLrs ? foundLrs.clone() : null;
  }

  add(lrs) {
    this.list = [...this.list, (lrs instanceof LRS) ? lrs : new LRS(lrs)];
  }

  update(lrs) {
    this.remove(lrs);
    this.add(lrs);
  }

  remove(lrsData) {
    this.list = this.list.filter(lrs => lrs.guid !== lrsData.guid);
  }
}

function getGuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}


const xAPI = {};
xAPI.LRS = new LRSList();

export default xAPI;