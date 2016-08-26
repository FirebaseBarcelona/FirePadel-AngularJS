///<reference path='../../../typings/tsd.d.ts' />
module Auth {
  'use strict';

  class Auth {
    private $firebaseAuth: AngularFireAuthService;

    public static $inject: Array<string> = [
      '$firebaseAuth'
    ];

    constructor($firebaseAuth: AngularFireAuthService) {
      this.$firebaseAuth = $firebaseAuth;
    }

    private signInWithPopup(signInMethod) {
      return this.$firebaseAuth().$signInWithPopup(signInMethod);
    }

    public signInWithGoogle() {
      return this.signInWithPopup('google');
    }

    public getUserData() {
      return this.$firebaseAuth().$getAuth();
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
