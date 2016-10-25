import lrsListTemplate from './lrs-list.html';

class LRSListCtrl {
  constructor($window, xAPI, storageHelper) {
    'ngInject';

    this.$window = $window;
    this.xAPI = xAPI;
    this.storageHelper = storageHelper;

    this.xAPI.LRS.import(this.storageHelper.get('xAPI.LRSList'));
    this.refreshList();
  }

  onListChange() {
    this.storageHelper.set('xAPI.LRSList', this.xAPI.LRS.export());
    this.refreshList();
  }

  refreshList() {
    this.list = this.xAPI.LRS.getList();
  }

  removeLRS(lrs) {
    this.xAPI.LRS.remove(lrs);
    this.onListChange();
  }

  export() {
    let urlData = this.xAPI.LRS.export();
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

  onReadImportFile(fileContent) {
    this.importFileContent = fileContent;
  }

  import() {
    let contentJSON;
    try {
      contentJSON = JSON.parse(this.importFileContent);
    } catch (e) {
      alert('Error on parsing JSON from import file: ' + e);
      return;
    }
    this.xAPI.LRS.import(contentJSON);
    this.onListChange();
  }
}

export default {
  template: lrsListTemplate,
  controller: LRSListCtrl,
  controllerAs: 'lrsListCtrl'
};