import angular from 'angular';
import onReadFileDirective from './on-read-file-directive';

export default angular
  .module('app.directives', [])
  .directive('onReadFile', onReadFileDirective)
  .name;
