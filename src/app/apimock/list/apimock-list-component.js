import listTemplate from './list.html';

class ApimockListCtrl {
  constructor(apimockService) {
    'ngInject';

    this.apimockService = apimockService;
    this.list = this.apimockService.getList();
  }

  removeItem(item) {
    this.apimockService.removeItem(item);
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
