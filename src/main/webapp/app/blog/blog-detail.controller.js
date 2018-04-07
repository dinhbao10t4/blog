(function() {
    'use strict';
    angular
        .module('blogApp')
        .controller('BlogDetailController', BlogDetailController);
    BlogDetailController.$inject = ['Blog', 'entity', '$state'];

    function BlogDetailController(Blog, entity, $state) {
        var vm = this;
        vm.blog = entity;
    }
})();
