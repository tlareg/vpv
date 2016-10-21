import lrsListTemplate from './lrs-list.html';

class LRSListCtrl {
  constructor(xAPI) {
    'ngInject';

    this.xAPI = xAPI;
    this.refreshList();
  }

  refreshList() {
    this.list = this.xAPI.LRS.getList();
  }

  removeLRS(lrs) {
    this.xAPI.LRS.remove(lrs);
    this.refreshList();
  }
}

export default {
  template: lrsListTemplate,
  controller: LRSListCtrl,
  controllerAs: 'lrsListCtrl'
};
