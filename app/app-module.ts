///<reference path='../typings/tsd.d.ts' />
module wallaPadel {
  'use strict';

  /* @ngdoc object
   * @name wallaPadel
   * @description
   *
   */
  angular
    .module('wallaPadel', [
      'ngMaterial',
      'luegg.directives',
      'ui.router',
      'firebase',
      'home'
    ]);
}
