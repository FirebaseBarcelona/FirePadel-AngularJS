module Court {
  'use strict';

  function CourtDirective(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {
        data: '=',
        users: '='
      },
      templateUrl: 'home/court/court-directive.tpl.html',
      replace: false,
      controllerAs: 'court',
      controller: CourtController,
      link: function (scope: ng.IScope, element: JQuery, attrs: any): void {
        /*jshint unused:false */
        /*eslint "no-unused-vars": [2, {"args": "none"}]*/
      }
    }
  }
  interface ICourtFirebaseObject extends AngularFireObject {
    name: string,
    email: string,
    avatar: string,
    uuid: string
  }
  export class CourtController {

    private $firebaseArray: AngularFireArrayService;
    private $firebaseObject: ICourtFirebaseObject;
    private $mdToast: ng.material.IToastService;
    private joined: boolean;
    private $rootScope: angular.IRootScopeService;
    private userService: any;
    private authService: Auth.Auth;
    private $scope: angular.IScope;

    public static $inject: Array<string> = [
      '$firebaseObject',
      '$firebaseArray',
      'Users',
      'Auth',
      '$mdToast',
      '$scope',
      '$rootScope'
    ];

    constructor($firebaseObject,
                $firebaseArray,
                Users,
                Auth,
                $mdToast,
                $scope,
                $rootScope) {
      this.$firebaseArray = $firebaseArray;
      this.$mdToast = $mdToast;
      this.authService = Auth;
      this.$rootScope = $rootScope;
      this.$scope = $scope;
      this.joined = $scope.data.joined;
      this.$firebaseObject = $firebaseObject;
      this.userService = Users;
    }

    public hasAlreadyJoined(uuid): boolean {
      return this.$firebaseObject(
        new firebase.database()
          .ref()
          .child(`courts/court${this.$scope.data.id}/users/${uuid}`)
      );
    }

    public leaveCourt(): void {
      this.joined = false;
      this.$rootScope.$broadcast('leftCourt');
      this.$firebaseObject(
        new firebase.database()
          .ref()
          .child(`courts/court${this.$scope.data.id}/users/${this.authService.getUserData().uid}`))
          .$remove();
      this.$mdToast.show(this.$mdToast.simple()
        .toastClass('md-warn')
        .textContent('You have left the court')
        .hideDelay(1000)
      )
    }

    public joinCourt(): void {
      this.joined = true;
      let userData = this.authService.getUserData();
      let userObject = this.$firebaseObject(
        new firebase.database()
          .ref()
          .child(`courts/court${this.$scope.data.id}/users/${userData.uid}`)
      );
      userObject.name = userData.displayName.split(' ')[0];
      userObject.email = userData.email;
      userObject.avatar = userData.photoURL;
      userObject.uuid = userData.uid;

      userObject.$save();
      this.$rootScope.$broadcast('joinCourt', {courtId: this.$scope.data.id});
      this.$mdToast.show(this.$mdToast.simple()
        .toastClass('md-primary')
        .textContent('You have joined the court')
        .hideDelay(1000)
      )
    }
  }

  /**
   * @ngdoc directive
   * @name home.directive:court
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
   *   <example module="home">
   *       <file name="index.html">
   *           <court></court>
   *       </file>
   *   </example>
   *
   */
  angular
    .module('home')
    .directive('court', CourtDirective);
}
