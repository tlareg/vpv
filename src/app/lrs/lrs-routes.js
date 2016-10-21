export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('lrs', {
      abstract: true,
      url: '/lrs',
      template: '<ui-view></ui-view>'
    })
    .state('lrs.list', {
      url: '/list',
      template: '<lrs-list></lrs-list>'
    })
    .state('lrs.form', {
      url: '/form/:guid',
      template: '<lrs-form></lrs-form>'
    })
    ;
};
