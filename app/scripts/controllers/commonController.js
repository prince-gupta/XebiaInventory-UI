/**
 * Created by Pgupta on 02-08-2016.
 */
angular.module('app')
    .controller('commonController',
    function ($scope, $cookieStore, CommonFactory, $uibModal) {

        $scope.data = {};
        $scope.loginFailed = false;
        $scope.loginMessage = "Invalid Credentials";

        $scope.login = function(){
            $scope.loginFailed = false;
            CommonFactory.login($scope.data).success(function(data){
                if(data.message == 'SUCCESS'){
                    $cookieStore.put('token',data.token);
                    $cookieStore.put('Username',data.userName);
                    window.location = "/app/views/main.html#/register";
                }
                else{
                    $scope.loginFailed = true;
                    $scope.loginMessage = "Invalid Username or Password !"
                }
            }).error(function (data, status, headers, config) {
                alert("Login Failed");
            });

        }

    }).factory('CommonFactory', function ($http) {
        return{
            login: function (data) {
                return $http.post('http://localhost:8080/inventory/logon/generateToken',data);
            }
        }
    });