///<reference path='../../../typings/tsd.d.ts' />
module Auth {
  'use strict';

  class Auth {
    private $firebaseAuth: AngularFireAuthService;
    private userData: AngularFireAuth;

    public static $inject: Array<string> = [
      '$firebaseAuth'
    ];

    constructor($firebaseAuth: AngularFireAuthService) {
      this.$firebaseAuth = $firebaseAuth;
      this.userData = this.mapUserData();
    }

    private signInWithPopup(signInMethod) {
      return this.$firebaseAuth().$signInWithPopup(signInMethod);
    }

    public signInWithGoogle() {
      return this.signInWithPopup('google');
    }

    private mapUserData() {

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
