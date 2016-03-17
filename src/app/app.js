import $ from 'jquery';
require('bootstrap-loader');
import angular from 'angular';
import './app.css';
import navbar from './navbar/navbar';

class AppCtrl {
  constructor() {
    this.appDupa = 'app dupa aaaaaaaaaaaa';
  }
}

let app = () => {
  return {
    template: require('./app.html'),
    controller: AppCtrl,
    controllerAs: 'appCtrl'
  }
};

export default angular
  .module('app', [])
  .directive('app', app)
  .directive('navbar', navbar);
