module HomeCtrl {
  'use strict';

  class HomeCtrl {

    private authService: Auth.Auth;
    private courtService: Court.Court;
    private userService: Users.Users;
    private userData: firePadel.IUser;
    private messageService: Messages.Messages;
    private joinedAnyCourt: boolean;
    private $firebaseArray: AngularFireArrayService;
    private $rootScope: angular.IRootScopeService;
    private $firebaseObject: AngularFireObjectService;
    public courts: AngularFireArray;
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
      '$rootScope'
    ];

    // dependencies are injected via AngularJS $injector
    constructor($firebaseObject: AngularFireObjectService,
                $firebaseArray: AngularFireArrayService,
                Auth: Auth.Auth,
                Users: Users.Users,
                Court: Court.Court,
                Messages: Messages.Messages,
                $rootScope: angular.IRootScopeService) {
      this.courts = [];
      this.$firebaseArray = $firebaseArray;
      this.$rootScope = $rootScope;
      this.$firebaseObject = $firebaseObject;
      this.authService = Auth;
      this.userService = Users;
      this.courtService = Court;
      this.messageService = Messages;
      this.$rootScope.$on('leftCourt', () => {
        this.messageService.wipeChat();
        this.joinedAnyCourt = false;
      });
      this.$rootScope.$on('joinCourt', (e, args) => {
        this.messageService.setChat(args.courtId);
        this.joinedAnyCourt = true;
      });
      this.$rootScope.$on('authStateChange', () => {
        this.init();
      });
    }

    private init() {
      if (this.isUserLogged()) {
        this.authService.setUserData(this.authService.getUserData());
        this.setCourts(this.courtService.getCourts());
        this.checkIfAlreadyJoined();
      }
      this.userData = this.authService.getUserData();
    }

    private checkIfAlreadyJoined() {
      this.courts.$loaded((courts) => {
        let joinedCourts = courts.filter((court) => {
          for (let user in court.users) {
            if (court.users[user].uuid === this.authService.getUserData().uid) {
              court.joined = true;
              this.joinedAnyCourt = true;
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

    public logInProcess() {
      this.logIn().then((r: any) => {
        this.authService.setUserData(r.user);
        this.setCourts(this.courtService.getCourts());
        this.checkIfAlreadyJoined();
        this.userData = this.authService.getUserData();
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
