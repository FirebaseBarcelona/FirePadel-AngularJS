///<reference path='../../../typings/tsd.d.ts' />
module ChatWindow {
  'use strict';

  function ChatWindowDirective(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'home/chat-window/chat-window-directive.tpl.html',
      replace: false,
      controllerAs: 'chatWindow',
      controller: ChatWindowController,
      link: function (scope: ng.IScope, element: JQuery, attrs: any): void {
        /*jshint unused:false */
        /*eslint "no-unused-vars": [2, {"args": "none"}]*/
      }
    }
  }

  export class ChatWindowController {
    public name: string;
    public static $inject: Array<string> = [];

    constructor() {
      this.name = 'chatWindow';
    }
  }

  /**
  * @ngdoc directive
  * @name home.directive:chatWindow
  * @restrict EA
  * @element
  *
  * @description
  *
  * @example
  *   <example module="home">
  *       <file name="index.html">
  *           <chat-window></chat-window>
  *       </file>
  *   </example>
  *
  */
  angular
    .module('home')
    .directive('chatWindow', ChatWindowDirective);
}
