import demosTemplate from './demos.html';

class DemosCtrl {
  constructor() {
    'ngInject';
  }
}

export default {
  template: demosTemplate,
  controller: DemosCtrl,
  controllerAs: 'demosCtrl'
};
