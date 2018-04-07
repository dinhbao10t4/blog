(function() {
    'use strict';
    angular
        .module('blogApp')
        .controller('BlogCreateUpdateController', BlogCreateUpdateController);
    BlogCreateUpdateController.$inject = ['Blog', 'entity', '$state'];

    function BlogCreateUpdateController(Blog, entity, $state) {
        var vm = this;
        vm.blog = entity;

        vm.save = function() {
            console.log(vm.blog);
            vm.blog.deleted = false;
            if (vm.blog.id != undefined) {
                Blog.update(vm.blog, onSaveSuccess, onSaveError);
            } else {
                Blog.save(vm.blog, onSaveSuccess, onSaveError);
            }
        };

        function onSaveSuccess(result) {
            $state.go('list-blog', null, {
                reload: true
            });
        };

        function onSaveError() {};
    }
})();
