
class NavCtrl {
  constructor() {
  }
}

let navbar = () => {
  return {
    template: require('./navbar.html'),
    controller: NavCtrl,
    controllerAs: 'navCtrl'
  }
};

export default navbar;
