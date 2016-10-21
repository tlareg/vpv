import angular from 'angular';
import routes from './apimock-routes';
import listComponent from './list/apimock-list-component';
import itemComponent from './item/apimock-item-component';
import ApimockService from './apimock-service';

export default angular
  .module('app.apimock', [])
  .config(routes)
  .service('apimockService', ApimockService)
  .component('apimockList', listComponent)
  .component('apimockItem', itemComponent)
  .name;
