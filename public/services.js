
// points to backend json api
angular.module('myApp.services', ['ngResource']).factory('BlogFactory', function ($resource) {
    return $resource('/blogs/:id', {id : '@_id'},  {
        update : {
            method: 'PUT'
        }
        });
});

