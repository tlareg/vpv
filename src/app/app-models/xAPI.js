class Statement {
  constructor() {

  }
}

class LRS {
  constructor(lrs) {
    this.import(lrs);
  }

  static export(lrs) {
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

  export() {
    return LRS.export(this);
  }

  import(lrs) {
    Object.assign(this, {
      guid: getGuid()
    }, LRS.export(lrs));
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
    return foundLrs ? foundLrs.export() : null;
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

  static export(lrsList) {
    return {
      list: lrsList.list.map(lrs => (lrs instanceof LRS) ? lrs.export() : lrs)
    };
  }

  export() {
    return LRSList.export(this);
  }

  import(lrsList) {
    this.list = [];
    if (!lrsList) return;
    LRSList
      .export(lrsList)
      .list
      .forEach(lrs => this.add(lrs));
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