import angular from 'angular';
import routes from './demos-routes';
import demosComponent from './demos-component';
import d3DemoComponent from './d3/d3-demo-component';
import chartjsDemoComponent from './chartjs/chartjs-demo-component';
import cyDemoComponent from './cy/cy-demo-component';

export default angular
  .module('app.demos', [])
  .config(routes)
  .component('demos', demosComponent)
  .component('d3Demo', d3DemoComponent)
  .component('chartjsDemo', chartjsDemoComponent)
  .component('cyDemo', cyDemoComponent)
  .name;
