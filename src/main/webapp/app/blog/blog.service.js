(function () {
    'use strict';

    angular
        .module('blogApp')
        .factory('Blog', Blog);

    Blog.$inject = ['$resource'];

    function Blog ($resource) {
        var service = $resource('api/blogs/:id', {}, {
            'query': {method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'save': { method:'POST' },
            'update': { method:'PUT' },
            'delete':{ method:'DELETE'}
        });

        return service;
    }
})();
