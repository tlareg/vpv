import _ from 'lodash';

export default class ApimockService {
  constructor($window, guidService) {
    'ngInject';

    this.$window = $window;
    this.guidService = guidService;

    this.list = [];
  }

  getList() {
    return this.list;
  }

  addItem(item) {
    if (!item.guid) {
      item.guid = this.guidService.getGuid();
    }
    this.list.push(item);
    this.sortList();
  }

  updateItem(item) {
    if (!item) {
      return;
    }
    if (!item.guid) {
      this.addItem(item);
    }
    this.removeItem(item);
    this.list.push(item);
    this.sortList();
  }

  findItemByGuid(guid) {
    return _.find(this.list, { guid: guid });
  }

  removeItem(item) {
    if (!item || !item.guid) {
      return;
    }
    const guid = item.guid;
    _.remove(this.list, (i) => {
      return i.guid === guid;
    });
    this.sortList();
  }

  sortList() {
    _.sortBy(this.list, 'guid');
  }

  export() {
    let urlData = this.getListForExport();
    try {
      urlData = JSON.stringify(urlData);
    } catch(e) {
      alert('Error on export: ' + e);
      return;
    }
    const url = 'data:text/json;charset=utf8,' + encodeURIComponent(urlData);
    this.$window.open(url, '_blank');
    this.$window.focus();
  }

  getListForExport() {
    return _.map(this.list, (item) => {
      return {
        guid: item.guid,
        url: item.url,
        method: item.method,
        response: item.response
      };
    });
  }

  import(contentStr) {
    let contentJSON;
    try {
      contentJSON = JSON.parse(contentStr);
    } catch (e) {
      alert('Error on parsing JSON from import file: ' + e);
      return;
    }
    this.list = contentJSON;
    return this.list;
  }
}
