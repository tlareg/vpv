import angular from 'angular';
import routes from './lrs-routes';
import lrsListComponent from './list/lrs-list-component';
import lrsFormComponent from './form/lrs-form-component';

export default angular
  .module('app.lrs', [])
  .config(routes)
  .component('lrsList', lrsListComponent)
  .component('lrsForm', lrsFormComponent)
  .name;
