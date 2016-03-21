import './app.css';
import bootstrapLoader from 'bootstrap-loader';
import angular from 'angular';
import uirouter from 'angular-ui-router';
import appTemplate from './app.html';
import AppCtrl from './app-controller';
import appRouting from './app-routing'
import appServices from './app-services/app-services-module';
import appDirectives from './app-directives/app-directives-module';
import navbarModule from './navbar/navbar-module';
import homeModule from './home/home-module';
import demosModule from './demos/demos-module';
import apimockModule from './apimock/apimock-module';

export default angular
  .module('app', [
    uirouter,
    appServices,
    appDirectives,
    navbarModule,
    homeModule,
    demosModule,
    apimockModule
  ])
  .config(appRouting)
  .component('app', {
    template: appTemplate,
    controller: AppCtrl,
    controllerAs: 'appCtrl'
  })
  .name;
