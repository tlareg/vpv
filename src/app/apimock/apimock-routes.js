export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('apimock', {
      abstract: true,
      url: '/apimock',
      template: '<ui-view></ui-view>'
    })
    .state('apimock.list', {
      url: '/list',
      template: '<apimock-list></apimock-list>'
    })
    .state('apimock.item', {
      url: '/item/:guid',
      template: '<apimock-item></apimock-item>'
    })
    ;
};
