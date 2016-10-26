export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('statements', {
      url: '/statements',
      template: '<statements></statements>'
    });
};
