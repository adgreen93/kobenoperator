// public/core.js
var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/api/stages')
        .success(function(data) {
            $scope.todos = data;

        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

        // when submitting the add form, send the text to the node APC

}

function searchBox() {
  console.log('blah');
}
