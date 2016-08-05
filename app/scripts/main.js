angular
    .module('app', [
        'ngRoute',
        'ngAnimate',
        'ui.bootstrap',
        'ngCookies'
    ])
    .config(function($routeProvider) {
    $routeProvider
        .when('/',{
            templateUrl : '../views/login.html',
            controller: 'commonController'
        })
        .when('/register', {
            templateUrl : '../views/register.html',
            controller  : 'registerController'
        })

        .when('/assets', {
            templateUrl : '../views/assets.html',
            controller  : 'assetController'
        });
});

function openSideBar(){
    $("#menu-toggle").hide();
    $("#menu-close").show();
    $("#sidebar-wrapper").toggleClass("active");
}
function closeSideBar(){
    $("#menu-toggle").show();
    $("#menu-close").hide();
    $("#sidebar-wrapper").toggleClass("active");
}