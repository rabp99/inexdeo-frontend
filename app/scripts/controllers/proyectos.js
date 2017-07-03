'use strict';

/**
 * @ngdoc function
 * @name inexdeoFrotendApp.controller:ProyectosCtrl
 * @description
 * # ProyectosCtrl
 * Controller of the inexdeoFrotendApp
 */
angular.module('inexdeoFrotendApp')
.controller('ProyectosCtrl', function ($scope, proyectosservice, $state, ngProgressFactory) {
    $scope.proyectos = [];
    $scope.loading = false;
    $scope.myInterval = 4000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    
    function init() {
        $scope.progressbar = ngProgressFactory.createInstance();
        $scope.progressbar.start();
        
        $scope.loading = true;
        proyectosservice.get(function(data) {
            $scope.proyectos = data.proyectos;
            if ($scope.proyectos.length === 1) {
                $state.go('proyectos-detail', {id: $scope.proyectos[0].id});
            } else {
                angular.forEach($scope.proyectos, function(value, key) {
                    if (!value.portada) {
                        var i = 0;
                        angular.forEach(value.proyecto_images, function(value, key) {
                            value.index = i;
                            i++;
                        });
                    }
                });
            }
            $scope.loading = false;
            $scope.progressbar.complete();
        });
    }
    init();
});