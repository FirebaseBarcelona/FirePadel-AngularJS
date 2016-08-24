///<reference path='../../../../typings/tsd.d.ts' />
module ChatMessage {
  'use strict';

  function ChatMessageDirective(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'home/chat-window/chat-message/chat-message-directive.tpl.html',
      replace: false,
      controllerAs: 'chatMessage',
      controller: ChatMessageController,
      link: function (scope: ng.IScope, element: JQuery, attrs: any): void {
        /*jshint unused:false */
        /*eslint "no-unused-vars": [2, {"args": "none"}]*/
      }
    }
  }

  export class ChatMessageController {
    public name: string;
    public static $inject: Array<string> = [];

    constructor() {
      this.name = 'chatMessage';
    }
  }

  /**
  * @ngdoc directive
  * @name home.directive:chatMessage
  * @restrict EA
  * @element
  *
  * @description
  *
  * @example
  *   <example module="home">
  *       <file name="index.html">
  *           <chat-message></chat-message>
  *       </file>
  *   </example>
  *
  */
  angular
    .module('home')
    .directive('chatMessage', ChatMessageDirective);
}
