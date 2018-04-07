(function() {
    'use strict';

    angular
        .module('blogApp')
        .config(stateAbsConfig).config(stateConfig);

      	stateAbsConfig.$inject = [ '$stateProvider' ];

      	function stateAbsConfig($stateProvider) {
      		$stateProvider.state('blog', {
      			url : '/blog',
      			parent : 'account'
      		});
      	}

    stateConfig.$inject = ['$stateProvider'];
    function stateConfig($stateProvider, CommonConstants) {
  		$stateProvider
  				.state(
  						'list-blog',
  						{
  							parent : 'blog',
  							url : '/list-blog',
  							data : {
  								authorities : [],
  								pageTitle : 'Danh sách blog'
  							},
  							views : {
  								'content@' : {
  									templateUrl : 'app/blog/blog.html',
  									controller : 'BlogController',
  									controllerAs : 'vm'
  								}
  							},
  							params : {
  								page : {
  									value : '1',
  									squash : true
  								},
  								sort : {
  									value : 'id,asc',
  									squash : true
  								},
  								search : null
  							},
  							resolve : {
  								pagingParams : [
  										'$stateParams',
  										'PaginationUtil',
  										function($stateParams, PaginationUtil) {
  											return {
  												page : PaginationUtil
  														.parsePage($stateParams.page),
  												sort : $stateParams.sort,
  												predicate : PaginationUtil
  														.parsePredicate($stateParams.sort),
  												ascending : PaginationUtil
  														.parseAscending($stateParams.sort),
  												search : $stateParams.search
  											};
  										} ],
  							}
  						})
  				.state(
  						'blog.new',
  						{
  							parent : 'blog',
  							url : '/create',
  							data : {
  								authorities : [],
  								pageTitle : 'Tạo mới blog'
  							},
  							views : {
  								'content@' : {
  									templateUrl : 'app/blog/blog-create-update.html',
  									controller : 'BlogCreateUpdateController',
  									controllerAs : 'vm'
  								}
  							},
  							resolve : {
  								entity : function() {
  									return {
  										id : null,
  										title : null,
  										content : null
  									};
  								}
  							}
  						})
  				.state(
  						'blog.edit',
  						{
  							parent : 'blog',
  							url : '/{id}/edit',
  							data : {
  								authorities : [],
  								pageTitle : 'Cập nhật blog'
  							},
  							views : {
  								'content@' : {
  									templateUrl : 'app/blog/blog-create-update.html',
  									controller : 'BlogCreateUpdateController',
  									controllerAs : 'vm'
  								}
  							},
  							resolve : {
  								entity : [ '$stateParams', 'Blog',
  										function($stateParams, Blog) {
  											return Blog.get({
  												id : $stateParams.id
  											}).$promise;
  										} ]
  							}
  						})
  				.state(
  						'blog.detail',
  						{
  							parent : 'blog',
  							url : '/{id}',
  							data : {
  								authorities : [],
  								pageTitle : 'Chi tiết blog'
  							},
  							views : {
  								'content@' : {
  									templateUrl : 'app/blog/blog-detail.html',
  									controller : 'BlogDetailController',
  									controllerAs : 'vm'
  								}
  							},
  							resolve : {
  								entity : [ '$stateParams', 'Blog',
  										function($stateParams, Blog) {
  											return Blog.get({
  												id : $stateParams.id
  											}).$promise;
  										} ]

  							}
  						})
  				;
  	}

})();
