export default class StatementsCtrl {
  constructor($scope, xAPI) {
    'ngInject';

    this.$scope = $scope;
    this.xAPI = xAPI;
    this.lrsList = xAPI.LRS.export().list;

    this.selectedLrsGuid = this.lrsList.length 
      ? this.lrsList[0].guid 
      : null;
    
    this.statements = [];
  }

  refreshStatements() {
    if (!this.selectedLrsGuid) return;
    const selectedLrs = this.xAPI.LRS.getByGuid(this.selectedLrsGuid);
    selectedLrs.fetchStatements().then(statements => {
      this.$scope.$apply(() => {
        this.statements = statements;
      });
    }); 
  }
}
