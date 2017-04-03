import _ from 'lodash';

export default class ApimockService {
  constructor($window, guidService, storageHelper, fileHelper) {
    'ngInject';

    this.$window = $window;
    this.guidService = guidService;
    this.storageHelper = storageHelper;
    this.fileHelper = fileHelper;

    this.list = [];
  }

  getList() {
    this.list = (this.storageHelper.get('apimock') || {}).list || [];
    return this.list;
  }

  onListChange() {
    this.list = _.sortBy(this.list, 'guid');
    this.storageHelper.set('apimock', { 
      list: this.getListForExport()
    });
  }

  addItem(item) {
    if (!item.guid) {
      item.guid = this.guidService.getGuid();
    }
    this.list.push(item);
    this.onListChange();
  }

  updateItem(item) {
    if (!item) {
      return;
    }
    if (!item.guid) {
      this.addItem(item);
    } else {
      this.removeItem(item);
      this.list.push(item);
      this.onListChange();
    }
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
    this.onListChange();
  }

  export() {
    let urlData = this.getListForExport();
    try {
      urlData = JSON.stringify(urlData);
    } catch(e) {
      alert('Error on export: ' + e);
      return;
    }
    const url = 'data:application/octet-stream;charset=utf8,' + encodeURIComponent(urlData);
    this.$window.open(url, '_blank');
    this.$window.focus();
  }

  export() {
    let apimockExportObj = this.getListForExport();
    let fileContent = ''

    try {
      fileContent = JSON.stringify(apimockExportObj);
    } catch(e) {
      alert('Error on export: ' + e);
      return;
    }

    this.fileHelper.triggerFileDownload({
      fileName: 'apimock_export.json',
      contentType: 'application/json',
      content: fileContent
    })
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
      throw new Error('import file json parsing error')
    }
    this.list = contentJSON;
    this.onListChange();
    return this.list;
  }
}
