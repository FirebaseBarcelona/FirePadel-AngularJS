///<reference path='../../typings/tsd.d.ts' />
module HomeCtrl {
  'use strict';

  class HomeCtrl {

    private authService: Auth.Auth;
    private courtService: Court.Court;
    private userService: User.User;
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
      'Users',
      'Court'
    ];

    // dependencies are injected via AngularJS $injector
    constructor($firebaseObject: AngularFireObjectService,
                $firebaseArray: AngularFireArrayService,
                Auth: Auth.Auth,
                Users: Users.Users,
                Court: Court.Court) {
      this.courts = [];
      this.$firebaseArray = $firebaseArray;
      this.$firebaseObject = $firebaseObject;
      this.authService = Auth;
      this.userService = Users;
      this.courtService = Court;
      this.init();
    }

    private init() {
      if (this.isUserLogged()) {
        console.log('Is logged');
        this.userService.setUserData(this.authService.getUserData());
        this.setCourts(this.courtService.getCourts());
        this.checkIfAlreadyJoined();
      } else {
        this.logIn().then(() => {
          this.setCourts(this.courtService.getCourts());
          this.checkIfAlreadyJoined();
        });
      }
    }

    private checkIfAlreadyJoined() {
      console.log('checking');
      this.courts.$loaded((courts: Array) => {
        courts.filter((court)=> {
          console.log(court.users);
          court.users.filter((u)=>{
            console.log(u);
          });
        });
      });
    }
    private logIn() {
      return this.authService.signInWithGoogle();
    }

    private isUserLogged() {
      return this.authService.getUserData() !== null;
    }

    public setCourts(courts) {
      this.courts = courts;
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
