import lrsListTemplate from './lrs-list.html';

class LRSListCtrl {
  constructor($q, $scope, $window, xAPI, storageHelper, confirmationHelper) {
    'ngInject';

    this.$q = $q;
    this.$scope = $scope;
    this.$window = $window;
    this.xAPI = xAPI;
    this.storageHelper = storageHelper;
    this.confirmationHelper = confirmationHelper;

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
    this.confirmationHelper
      .confirmAction()
      .then(() => {
        this.$scope.$apply(() => {
          this.xAPI.LRS.remove(lrs);
          this.onListChange();
        });
      })
      .catch(() => {});
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
    this.$q.when()
      .then(() => JSON.parse(this.importFileContent))
      .then(contentJSON => {
        this.xAPI.LRS.import(contentJSON);
        this.onListChange();
      })
      .catch(() => {
        this.confirmationHelper.confirmError('Choose valid json import file');
      });
  }
}

export default {
  template: lrsListTemplate,
  controller: LRSListCtrl,
  controllerAs: 'lrsListCtrl'
};
