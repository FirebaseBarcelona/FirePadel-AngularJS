module Auth {
  'use strict';
  import IPromise = angular.IPromise;

  export class Auth {
    private $firebaseAuth: AngularFireAuthService;
    private $rootScope: ng.IRootScopeService;
    private userData: firePadel.IUser = null;

    public static $inject: Array<string> = [
      '$firebaseAuth',
      '$rootScope'
    ];

    constructor($firebaseAuth: AngularFireAuthService, $rootScope: ng.IRootScopeService) {
      this.$firebaseAuth = $firebaseAuth;
      this.$rootScope = $rootScope;
      this.loadUserData();
    }

    private signInWithPopup(signInMethod): IPromise<{}> {
      return this.$firebaseAuth().$signInWithPopup(signInMethod);
    }

    public signInWithGoogle() {
      return this.signInWithPopup('google');
    }

    private loadUserData(): void {
      return this.$firebaseAuth().$onAuthStateChanged((r) => {
        this.setUserData(r);
        this.$rootScope.$broadcast('authStateChange');
      });
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
