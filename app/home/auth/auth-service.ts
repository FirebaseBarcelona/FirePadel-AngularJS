///<reference path='../../../typings/tsd.d.ts' />
module Auth {
  'use strict';

  class Auth {
    private $firebaseAuth: AngularFireAuthService;
    private userData: any;

    public static $inject: Array<string> = [
      '$firebaseAuth'
    ];

    constructor($firebaseAuth: AngularFireAuthService) {
      this.$firebaseAuth = $firebaseAuth;
      this.loadUserData();
    }

    private signInWithPopup(signInMethod) {
      return this.$firebaseAuth().$signInWithPopup(signInMethod);
    }

    public signInWithGoogle() {
      return this.signInWithPopup('google');
    }

    private loadUserData() {
      this.userData = this.$firebaseAuth().$getAuth();
  }

    public getUserData() {
      return this.userData;
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
