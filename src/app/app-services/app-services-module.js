import angular from 'angular';
import GuidService from './guid-service';

export default angular
  .module('app.services', [])
  .service('guidService', GuidService)
  .name;
