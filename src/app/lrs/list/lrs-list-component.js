import lrsListTemplate from './lrs-list.html';

class LRSListCtrl {
  constructor(xAPI, storageHelper) {
    'ngInject';

    this.xAPI = xAPI;
    this.storageHelper = storageHelper
    this.refreshList();
  }

  refreshList() {
    const list = this.storageHelper.get('xAPI.LRSList');
    this.xAPI.LRS.import(list);

    this.list = this.xAPI.LRS.getList();
  }

  removeLRS(lrs) {
    this.xAPI.LRS.remove(lrs);
    this.storageHelper.set('xAPI.LRSList', this.xAPI.LRS.export());
    this.refreshList();
  }
}

export default {
  template: lrsListTemplate,
  controller: LRSListCtrl,
  controllerAs: 'lrsListCtrl'
};
