angular.module('viktorina').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	
	$stateProvider
	.state('manage', {
		url : '/manage',
		template : '<quiz-manage></quiz-manage>'
	})
	.state('edit', {
		url: '/edit/:id',
		template: '<quiz-edit></quiz-edit>'
	})
	.state('quiz', {
		url : '/quiz/:id',
		template: '<quiz-view></quiz-view>'
	});
	
	$urlRouterProvider.otherwise('/manage');
});