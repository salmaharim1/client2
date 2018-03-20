angular.module('spiApp')
.controller('evaluationCtrl', ['$scope', 'evaluationSvc', 'NgTableParams', function ($scope, evaluationSvc, NgTableParams) {

    $scope.sujet = "une évaluation";
    $scope.editoption = "la modification";
    
    $scope.evaluations = [] ;
    $scope.editEvaluation = {};

    $scope.cannotRemove = false;

 //Recuperation des evaluations
 getEvaluations = function () {
    evaluationSvc.getEvaluations(function (data) {
      console.log(data);
      $scope.evaluations = data;
      $scope.tableParams = new NgTableParams({ sorting: { name: "asc" } }, { dataset: data });
      $scope.tableParams
    });
  }
  getEvaluations();


  $scope.cancelEditing = function () {
    $('#form-collapse').collapse('hide');
    $scope.formevaluation.$setPristine();
    $scope.editEvaluation={};
    getEvaluations();
  }

  $scope.editSubmit = function () {
    if($scope.editoption == "la modification"){
      console.log($scope.editoption);
      evolutionSvc.updateEvolution($scope.editEvolution, function (data) {
        $('#form-collapse').collapse('hide');
        $scope.formevolution.$setPristine();
        $scope.editEvolution={};
        getEvaluations();
      });
    }
    else {
        evolutionSvc.saveEvolution($scope.editEvaluation, function (data) {
        $('#form-collapse').collapse('hide');
        $scope.formevaluation.$setPristine();
        $scope.editEvaluation={};
        getEvaluations();
      });
    }
   
  }


  $scope.validateDelete = function () {
    evolutionSvc.deleteEvolutionById($scope.selectedRubrique.idRubrique, function (data) {
      if (data == true) {
        $scope.cannotRemove = false;
        $('#delete-modal').modal('hide');
        getEvaluations();
      }
      else {
        $scope.cannotRemove = true;
      }
    })
  }

  $scope.cancelDelete = function () {
    $('#delete-modal').modal('hide');
  }


  $scope.showInfo = function (evaluation) {
    $scope.selectedEvaluation = evaluation;
  }

  $scope.showDeleteBox = function (evaluation) {
    $scope.selectedEvaluation = evaluation;
    $scope.cannotRemove = false;
  }

  $scope.showUpdateBox = function (evaluation) {
    $scope.editoption = "la modification";
    $scope.editEvaluation = evaluation;
    $('#form-collapse').collapse('show');
  }

  $scope.showAddBox = function () {
    $scope.editEvaluation = {};
    $scope.formevaluation.$setPristine();
    $scope.editoption = "l\'ajout";
    $('#form-collapse').collapse('show');
  }



}]);