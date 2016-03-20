export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('demos', {
      url: '/demos',
      template: '<demos></demos>'
    })
    .state('demos.d3', {
      url: '/d3',
      template: '<d3-demo></d3-demo>'
    })
    .state('demos.chartjs', {
      url: '/chartjs',
      template: '<chartjs-demo></chartjs-demo>'
    })
    .state('demos.cy', {
      url: '/cy',
      template: '<cy-demo></cy-demo>'
    })
    ;
};
