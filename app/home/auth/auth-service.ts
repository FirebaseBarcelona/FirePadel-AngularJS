///<reference path='../../../typings/tsd.d.ts' />
module Auth {
  'use strict';

  class Auth {
    private $firebaseAuth: AngularFireAuthService;

    public static $inject: Array<string> = [
    ];

    constructor($firebaseAuth: AngularFireAuthService) {
      this.$firebaseAuth = $firebaseAuth;
    }

    get(): string {
      return 'Auth';
    }
  }

  /**
   * @ngdoc service
   * @name home.service:Auth
   *
   * @description
   *
   */
  angular
    .module('home')
    .service('Auth', Auth);
}
