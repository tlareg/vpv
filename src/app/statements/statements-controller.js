export default class StatementsCtrl {
  constructor(
    $scope, 
    xAPI, 
    spinnerHelper,
    confirmationHelper
  ) {
    'ngInject';

    this.$scope = $scope;
    this.xAPI = xAPI;
    this.spinnerHelper = spinnerHelper;
    this.confirmationHelper = confirmationHelper;

    this.lrsList = xAPI.LRS.export().list;

    this._selectFirstLrs();    
    
    this.statements = [];
    this.refreshStatements();
  }

  _selectFirstLrs() {
    this.selectedLrsGuid = this.lrsList.length 
      ? this.lrsList[0].guid 
      : null;
  }

  refreshStatements() {
    if (!this.selectedLrsGuid) return;
    const selectedLrs = this.xAPI.LRS.getByGuid(this.selectedLrsGuid);

    this.spinnerHelper.startAppSpinner();
    selectedLrs.fetchStatements()
      .then(statements => {
        this.$scope.$apply(() => {
          this.statements = statements;
        });
        this.spinnerHelper.stopAppSpinner();
      })
      .catch(() => {
        this.$scope.$apply(() => {
          this.statements = [];
        });
        this.spinnerHelper.stopAppSpinner();
        this.confirmationHelper.confirmError();
      });
  }

  onSelectedLrsChange() {
    this.refreshStatements();
  }
}
