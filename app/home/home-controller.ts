///<reference path='../../typings/tsd.d.ts' />
module HomeCtrl {
  'use strict';

  class HomeCtrl {

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: Array<string> = [
      '$firebaseAuth',
      '$firebaseObject',
      '$firebaseArray',
    ];

    // dependencies are injected via AngularJS $injector
    constructor($firebaseAuth, $firebaseObject, $firebaseArray) {
      this.courts = [];
      this.$firebaseArray = $firebaseArray;
      this.$firebaseAuth = $firebaseAuth;
      this.$firebaseObject = $firebaseObject;
      this.user = null;
      this.init();
    }

    private init() {
      this.getUserData();
      if (this.isUserLogged()) {
        this.getCourts();
      } else {
        this.signUp().then((r) => {
          this.token = r.credential.accesToken;
          this.user = r.user;
          this.getCourts();
        });
      }
    }

    private isUserLogged() {
      return this.user !== null;
    }

    private getUserData() {
      this.user = this.$firebaseAuth().$getAuth();
    }

    public signUp() {
      return this.$firebaseAuth().$signInWithPopup("google");
    }

    public getCourts() {
      let courts = firebase.database().ref().child('courts');
      this.courts = this.$firebaseArray(courts);
    }
  }


  /**
   * @ngdoc object
   * @name home.controller:HomeCtrl
   *
   * @description
   *
   */
  angular
    .module('home')
    .controller('HomeCtrl', HomeCtrl);
}
