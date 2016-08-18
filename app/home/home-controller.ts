///<reference path='../../typings/tsd.d.ts' />
module HomeCtrl {
  'use strict';

  class HomeCtrl {

    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: Array<string> = [
      '$firebaseObject',
      '$firebaseAuth',
      '$firebaseArray',
    ];

    // dependencies are injected via AngularJS $injector
    constructor($firebaseObject, $firebaseAuth, $firebaseArray) {
      this.courts = [];
      this.$firebaseArray = $firebaseArray;
      this.$firebaseAuth = $firebaseAuth;
      this.$firebaseObject = $firebaseObject;
      this.signUp();
    }

    public signUp() {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/plus.login');

      firebase.auth().signInWithPopup(provider).then((r) => {
        let token = r.credential.accessToken;
        let user = r.user;
        this.getDataBase();
      });
    }

    public getDataBase() {
      let courts = firebase.database().ref().child('courts');
      this.courts = this.$firebaseArray(courts);
      console.log(this.courts);

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
