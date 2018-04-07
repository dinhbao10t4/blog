(function() {
    'use strict';

    angular
        .module('blogApp')
        .controller('BlogController', BlogController);

    BlogController.$inject = ['Blog', '$state'];

    function BlogController(Blog, $state) {
        var vm = this;
        vm.blogs = [];
        vm.loadAll = loadAll;
        vm.loadAll();

        function loadAll() {
            Blog.query({}, onSuccess, onError);
        }

        function onSuccess(response) {
            vm.blogs = response;
        }

        function onError() {

        }

        vm.deleteBlog = function(id){
          Blog.delete({id: id},
          function () {
              $state.reload();
          });
        };
    }

})();
