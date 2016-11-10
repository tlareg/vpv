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
      'xAPIVersion',
      'httpBasicAuth'
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
      guid: getGuid(),
    }, LRS.export(lrs));

    this.url = typeof this.url === 'string' 
      ? (this.url.slice(-1) === '/' ? this.url.slice(0, -1) : this.url)
      : '';

    this.httpBasicAuth = createHttpBasicAuth(this.username, this.password);
  }

  fetchStatements() {
    return fetch(this.url + '/statements', {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      headers: new Headers({
        'Accept': 'application/json',
        'Authorization': `Basic ${this.httpBasicAuth}`,
        'X-Experience-API-Version': this.xAPIVersion
      })
    })
      .then(response => response.json())
      .then(json => json 
        ? this.setStatements(json.statements) 
        : this.clearStatements()
      );
  }

  setStatements(statements) {
    return this._statements = statements || [];
  }

  getStatements() {
    return this._statements;
  }

  clearStatements() {
    return this.setStatements([]);
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
    return foundLrs || null;
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

function createHttpBasicAuth(username, password) {
  return btoa(`${username}:${password}`);
}

const xAPI = {};

xAPI.LRS = new LRSList();

export default xAPI;