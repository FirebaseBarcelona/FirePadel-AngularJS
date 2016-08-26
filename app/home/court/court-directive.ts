module Court {
  'use strict';

  function CourtDirective(): ng.IDirective {
    return {
      restrict:     'EA',
      scope:        {
        data: '=',
        users: '='
      },
      templateUrl:  'home/court/court-directive.tpl.html',
      replace:      false,
      controllerAs: 'court',
      controller:   CourtController,
      link:         function (scope: ng.IScope, element: JQuery, attrs: any): void {
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
      'Users'
    ];

    constructor($firebaseObject, $firebaseArray, Users) {
      this.$firebaseArray = $firebaseArray;
      this.$firebaseObject = $firebaseObject;
      this.userService = Users;
      console.log('court directive');
    }

    public joinCourt(court) {
      console.log(this.userService);
      let userData = this.userService.getUserData();
      let usersArray = this.$firebaseObject(new firebase.database().ref().child(`courts/court${court}/users/${userData.uuid}`));
      let userData = {
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar,
        uuid: userData.uuid
      };
      usersArray.$bindTo(this.userData, 'userData');
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
