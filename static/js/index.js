angular.module("myApp",['ui.router']);
var app = angular.module("myApp");

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/user');
    $stateProvider
	    .state('index',{
	    	url:'/index',
	    	templateUrl:'html/index/index.html',
	    	controller:'homeCtrl'
	    })
		.state('user',{
        	url:'/user',
        	templateUrl:'user/user.html',
        })
});