appRouting.$inject = ['$urlRouterProvider', '$locationProvider'];

export default function appRouting($urlRouterProvider, $locationProvider) {
  'ngInject';

  $locationProvider.html5Mode(false);
  $urlRouterProvider.otherwise('/');
}
