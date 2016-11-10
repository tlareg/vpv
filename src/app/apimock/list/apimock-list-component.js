import listTemplate from './list.html';

class ApimockListCtrl {
  constructor($scope, apimockService, confirmationHelper) {
    'ngInject';

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
    const importResult = this.apimockService.import(this.importFileContent);
    this.list = importResult || [];
  }
}

export default {
  template: listTemplate,
  controller: ApimockListCtrl,
  controllerAs: 'amListCtrl'
};
