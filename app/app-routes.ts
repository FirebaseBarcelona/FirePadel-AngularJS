///<reference path='../typings/tsd.d.ts' />
module wallaPadel {
    'use strict';

    angular
        .module('wallaPadel')
        .config(config);

    function config($urlRouterProvider: ng.ui.IUrlRouterProvider, $mdThemingProvider) {
        $urlRouterProvider.otherwise('/home');
        $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
    }
}
