///<reference path='../../typings/tsd.d.ts' />
module HomeCtrl {
  'use strict';

  class HomeCtrl {

    private authService: Auth.Auth;
    private courtService: Court.Court;
    private userService: User.User;
    private messageService: Messages.Messages;
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
      'Court',
      'Messages',
    ];

    // dependencies are injected via AngularJS $injector
    constructor($firebaseObject: AngularFireObjectService,
                $firebaseArray: AngularFireArrayService,
                Auth: Auth.Auth,
                Users: Users.Users,
                Court: Court.Court,
                Messages: Messages.Messages) {
      this.courts = [];
      this.$firebaseArray = $firebaseArray;
      this.$firebaseObject = $firebaseObject;
      this.authService = Auth;
      this.userService = Users;
      this.courtService = Court;
      this.messageService = Messages;
      this.init();
    }

    private init() {
      if (this.isUserLogged()) {
        this.authService.setUserData(this.authService.getUserData());
        console.log(this.authService.getUserData());
        this.setCourts(this.courtService.getCourts());
        this.checkIfAlreadyJoined();
      } else {
        this.logIn().then((r) => {
          this.authService.setUserData(r.user);
          console.log(r.user);
          this.setCourts(this.courtService.getCourts());
          this.checkIfAlreadyJoined();
        });
      }
      this.userData = this.authService.getUserData();
    }

    private checkIfAlreadyJoined() {
      this.courts.$loaded((courts: Array) => {
        let joinedCourts = courts.filter((court) => {
          for (let k in court.users) {
            if (court.users[k].uuid === this.authService.getUserData().uid) {
              court.joined = true;
              return true;
            }
          }
          return false;
        });
        if (joinedCourts.length > 0) {
          this.messageService.setChat(joinedCourts[0].id);
        }
      });
    }


    private logIn() {
      return this.authService.signInWithGoogle();
    }

    private isUserLogged() {
      console.log(this.authService.getUserData());
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
