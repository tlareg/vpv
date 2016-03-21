import itemTemplate from './item.html';
import _ from 'lodash';

class ApimockItemCtrl {

  constructor(
    $state,
    $stateParams,
    apimockService
  ) {
    'ngInject';

    this.$state = $state;
    this.$stateParams = $stateParams;
    this.apimockService = apimockService;

    this.initFormData();
  }

  initFormData() {
    const guid = this.$stateParams.guid;
    if (guid) {
      const item = this.apimockService.findItemByGuid(guid);
      this.formData = _.cloneDeep(item);
    } else {
      this.formData = {};
    }
  }

  submit() {
    let formData = _.cloneDeep(this.formData);
    if (formData.guid) {
      this.apimockService.updateItem(formData);
    } else {
      this.apimockService.addItem(formData);
    }
    this.$state.go('apimock.list');
  }
}

export default {
  template: itemTemplate,
  controller: ApimockItemCtrl,
  controllerAs: 'amItemCtrl'
};
