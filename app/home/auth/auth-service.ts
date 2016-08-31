///<reference path='../../../typings/tsd.d.ts' />
module Auth {
  'use strict';
  import IPromise = angular.IPromise;

  class Auth {
    private $firebaseAuth: AngularFireAuthService;
    private userData: firePadel.IUser;

    public static $inject: Array<string> = [
      '$firebaseAuth'
    ];

    constructor($firebaseAuth: AngularFireAuthService) {
      this.$firebaseAuth = $firebaseAuth;
      this.loadUserData();
    }

    private signInWithPopup(signInMethod): IPromise<{}> {
      return this.$firebaseAuth().$signInWithPopup(signInMethod);
    }

    public signInWithGoogle() {
      return this.signInWithPopup('google');
    }

    private loadUserData(): void {
      this.setUserData(this.$firebaseAuth().$getAuth());
    }

    public getUserData(): firePadel.IUser {
      return this.userData;
    }

    public setUserData(userData) {
      this.userData = userData;
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
