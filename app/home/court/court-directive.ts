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

    public static $inject: Array<string> = [
      '$firebaseAuth',
      '$firebaseObject',
      '$firebaseArray'
    ];

    constructor($firebaseAuth, $firebaseObject, $firebaseArray) {
      this.$firebaseArray = $firebaseArray;
      this.$firebaseAuth = $firebaseAuth;
      this.$firebaseObject = $firebaseObject;
    }

    public joinCourt(court) {
      console.log(this);
      let courtRef = new firebase.database().ref().child('courts/court' + court);
      let courtObject = this.$firebaseObject(courtRef);
      let usersArray = this.$firebaseArray(new firebase.database().ref().child('courts/court' + court + '/users'));
      usersArray.$add({
        name:   'Jeff',
        email:  'jeff@wallapop.com',
        avatar: 'https://lh3.googleusercontent.com/-ChdH-fy3imI/AAAAAAAAAAI/AAAAAAAAAAA/HECUgEmD-7g/W96-H96/photo.jpg?sz=64'
      });
      console.log(usersArray);
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
