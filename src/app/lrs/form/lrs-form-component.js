import lrsFormTemplate from './lrs-form.html';
import _ from 'lodash';

class LRSFormCtrl {

  constructor(
    $state,
    $stateParams,
    xAPI,
    storageHelper,
  ) {
    'ngInject';

    this.xAPI = xAPI;
    this.storageHelper = storageHelper;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.initFormData();
  }

  initFormData() {  
    const guid = this.$stateParams.guid;
    if (guid) {
      const lrs = this.xAPI.LRS.getByGuid(guid);
      this.formData = lrs && lrs.export() || {};
    } else {
      this.formData = {};
    }
  }

  submit() {
    let formData = _.cloneDeep(this.formData);
    if (formData.guid) {
      this.xAPI.LRS.update(formData);
    } else {
      this.xAPI.LRS.add(formData);
    }
    this.storageHelper.set('xAPI.LRSList', this.xAPI.LRS.export());
    this.$state.go('lrs.list');
  }
}

export default {
  template: lrsFormTemplate,
  controller: LRSFormCtrl,
  controllerAs: 'lrsFormCtrl'
};
