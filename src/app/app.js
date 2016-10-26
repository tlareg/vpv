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
import lrsModule from './lrs/lrs-module';
import statementsModule from './statements/statements-module';

import xAPI from './app-models/xAPI';
import storageHelper from './app-models/storage-helper';

export default angular

  .module('app', [
    uirouter,
    appServices,
    appDirectives,
    navbarModule,
    homeModule,
    demosModule,
    apimockModule,
    lrsModule,
    statementsModule
  ])

  .config(appRouting)

  .constant('xAPI', xAPI)
  .constant('storageHelper', storageHelper)

  .component('app', {
    template: appTemplate,
    controller: AppCtrl,
    controllerAs: 'appCtrl'
  })
  
  .name;
