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
    public static $inject: Array<string> = [
      '$firebaseObject',
      '$firebaseArray',
      'Users',
      '$scope'
    ];

    constructor($firebaseObject, $firebaseArray, Users, $scope) {
      this.$firebaseArray = $firebaseArray;
      this.$scope = $scope;
      this.$firebaseObject = $firebaseObject;
      this.userService = Users;
    }

    public hasAlreadyJoined(uuid): boolean {
      return this.$firebaseObject(new firebase.database().ref().child(`courts/court${this.$scope.data.id}/users/${uuid}`));
    }

    public leaveCourt() {

    }
    public joinCourt() {
      let userData = this.userService.getUserData();
      console.log(this);
      let userObject = this.$firebaseObject(new firebase.database().ref().child(`courts/court${this.$scope.data.id}/users/${userData.uuid}`));
      /* userObject.name = userData.name;
       userObject.email = userData.email;
       userObject.avatar = userData.avatar;
       userObject.uuid = userData.uuid;
       userObject.$save();*/
      console.log(userObject);
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
