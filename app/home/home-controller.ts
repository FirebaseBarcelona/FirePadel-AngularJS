///<reference path='../../typings/tsd.d.ts' />
module HomeCtrl {
  'use strict';

  class HomeCtrl {

    private authService: Auth.Auth;
    private courtService: Court.Court;
    private $firebaseArray: AngularFireArray;
    private $firebaseObject: AngularFireObject;
    public courts: Array;
    // $inject annotation.
    // It provides $injector with information about dependencies to be injected into constructor
    // it is better to have it close to the constructor, because the parameters must match in count and type.
    // See http://docs.angularjs.org/guide/di
    public static $inject: Array<string> = [
      '$firebaseObject',
      '$firebaseArray',
      'Auth',
      'Court'
    ];

    // dependencies are injected via AngularJS $injector
    constructor($firebaseObject: AngularFireObject,
                $firebaseArray: AngularFireArray,
                Auth: Auth.Auth,
                Court: Court.Court) {
      this.courts = [];
      this.$firebaseArray = $firebaseArray;
      this.$firebaseObject = $firebaseObject;
      this.authService = Auth;
      this.courtService = Court;
      this.init();
    }

    private init() {
      if (this.isUserLogged()) {
        console.log('Is logged');
        this.setCourts(this.courtService.getCourts());
      } else {
        console.log('Isn\'t logged');
        this.logIn();
      }
    }

    private logIn() {
      this.authService.signInWithGoogle().then((r) => {
        console.log(r);
      })
    }

    private isUserLogged() {
      return this.authService.getAuth() !== null;
    }

    public setCourts(courts) {
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
