import lrsFormTemplate from './lrs-form.html';
import _ from 'lodash';

class LRSFormCtrl {

  constructor(
    $state,
    $stateParams,
    xAPI
  ) {
    'ngInject';

    this.xAPI = xAPI;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.initFormData();
  }

  initFormData() {  
    const guid = this.$stateParams.guid;
    if (guid) {
      this.formData = this.xAPI.LRS.getByGuid(guid) || {};
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
    this.$state.go('lrs.list');
  }
}

export default {
  template: lrsFormTemplate,
  controller: LRSFormCtrl,
  controllerAs: 'lrsFormCtrl'
};
