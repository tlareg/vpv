import listTemplate from './list.html';

class ApimockListCtrl {
  constructor($q, $scope, apimockService, confirmationHelper) {
    'ngInject';

    this.$q = $q;
    this.$scope = $scope;
    this.apimockService = apimockService;
    this.confirmationHelper = confirmationHelper;

    this.refreshList();
  }

  refreshList() {
    this.list = this.apimockService.getList();
  }

  removeItem(item) {
    this.confirmationHelper
      .confirmAction()
      .then(() => {
        this.$scope.$apply(() => {
          this.apimockService.removeItem(item);
          this.refreshList();
        });
      })
      .catch(() => {});
  }

  export() {
    this.apimockService.export();
  }

  onReadImportFile(fileContent) {
    this.importFileContent = fileContent;
  }

  import() {
    this.$q.when()
      .then(() => this.apimockService.import(this.importFileContent))
      .then(importResult => {
        this.list = importResult || [];
      })
      .catch(() => {
        this.confirmationHelper.confirmError('Choose valid json import file');
      });
  }
}

export default {
  template: listTemplate,
  controller: ApimockListCtrl,
  controllerAs: 'amListCtrl'
};
