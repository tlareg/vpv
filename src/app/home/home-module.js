import angular from 'angular';
import routes from './home-routes';
import homeComponent from './home-component';

export default angular
  .module('app.home', [])
  .config(routes)
  .component('home', homeComponent)
  .name;
