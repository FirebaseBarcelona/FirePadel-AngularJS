///<reference path='../typings/tsd.d.ts' />
module firePadel {
    'use strict';

    angular
        .module('firePadel')
        .config(config);

    function config($urlRouterProvider: ng.ui.IUrlRouterProvider, $mdThemingProvider) {
        $urlRouterProvider.otherwise('/home');
        $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
    }
}
