import './app.css';
import bootstrapLoader from 'bootstrap-loader';
import angular from 'angular';
import uirouter from 'angular-ui-router';
import appTemplate from './app.html';
import AppCtrl from './app-controller';
import appRouting from './app-routing'
import navbarModule from './navbar/navbar-module';
import homeModule from './home/home-module';

export default angular
  .module('app', [
    uirouter,
    navbarModule,
    homeModule
  ])
  .config(appRouting)
  .component('app', {
    template: appTemplate,
    controller: AppCtrl,
    controllerAs: 'appCtrl'
  })
  .name;
