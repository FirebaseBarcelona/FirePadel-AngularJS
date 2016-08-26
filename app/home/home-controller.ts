///<reference path='../../typings/tsd.d.ts' />
module HomeCtrl {
  'use strict';

  class HomeCtrl {

    private authService: Auth.Auth;
    private courtService: Court.Court;
    private $firebaseArray: AngularFireArrayService;
    private $firebaseObject: AngularFireObjectService;
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
    constructor($firebaseObject: AngularFireObjectService,
                $firebaseArray: AngularFireArrayService,
                Auth: Court.Court,
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
        this.user = this.authService.getUserData();
        this.setCourts(this.courtService.getCourts());
      } else {
        this.logIn();
      }
    }

    private logIn() {
      this.authService.signInWithGoogle().then((r) => {
        console.log(r);
      })
    }

    private isUserLogged() {
      return this.authService.getUserData() !== null;
    }

    public setCourts(courts) {
      this.courts = this.$firebaseArray(courts);
    }

    public hasAlreadyJoined(){
      console.log(courts);
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
