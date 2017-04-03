import lrsListTemplate from './lrs-list.html';

class LRSListCtrl {
  constructor(
    $q,
    $scope,
    $window,
    xAPI,
    storageHelper,
    confirmationHelper,
    fileHelper
  ) {
    'ngInject';

    this.$q = $q;
    this.$scope = $scope;
    this.$window = $window;
    this.xAPI = xAPI;
    this.storageHelper = storageHelper;
    this.confirmationHelper = confirmationHelper;
    this.fileHelper = fileHelper;

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
    let lrsExportObj = this.xAPI.LRS.export();
    let fileContent = '';

    try {
      fileContent = JSON.stringify(lrsExportObj);
    } catch(e) {
      alert('Error on export: ' + e);
      return;
    }

    this.fileHelper.triggerFileDownload({
      fileName: 'lrs_export.json',
      contentType: 'application/json',
      content: fileContent
    })
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
