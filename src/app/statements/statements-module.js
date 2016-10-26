import angular from 'angular';
import routes from './statements-routes';
import stetementsComponent from './statements-component';

export default angular
  .module('app.statements', [])
  .config(routes)
  .component('statements', stetementsComponent)
  .name;
