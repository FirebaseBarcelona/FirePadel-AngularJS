module Court {
  'use strict';

  function CourtDirective(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {
        data: '=',
        users: '=',
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
    public name;
    public static $inject: Array<string> = [];

    constructor() {
      this.name = 'court';
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
