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

  export class CourtController {

    private $firebaseArray: AngularFireArrayService;
    private $firebaseObject: AngularFireObjectService;
    private userService: any;
    private authService: Auth.Auth;
    private $scope: angular.IScope;

    public static $inject: Array<string> = [
      '$firebaseObject',
      '$firebaseArray',
      'Users',
      'Auth',
      '$scope'
    ];

    constructor($firebaseObject,
                $firebaseArray,
                Users,
                Auth,
                $scope) {
      this.$firebaseArray = $firebaseArray;
      this.authService = Auth;
      this.$scope = $scope;
      this.$firebaseObject = $firebaseObject;
      this.userService = Users;
    }

    public hasAlreadyJoined(uuid): boolean {
      return this.$firebaseObject(new firebase.database().ref().child(`courts/court${this.$scope.data.id}/users/${uuid}`));
    }

    public leaveCourt() {
      this.$scope.data.joined = false;
      this.$firebaseObject(
        new firebase.database()
          .ref()
          .child(`courts/court${this.$scope.data.id}/users/${this.authService.getUserData().uid}`))
          .$remove();
    }

    public joinCourt() {
      this.$scope.data.joined = true;
      let userData = this.userService.getUserData();
      let userObject = this.$firebaseObject(new firebase.database().ref().child(`courts/court${this.$scope.data.id}/users/${userData.uid}`));
      userObject.name = userData.name;
      userObject.email = userData.email;
      userObject.avatar = userData.avatar;
      userObject.uuid = userData.uuid;
      userObject.$save();
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
