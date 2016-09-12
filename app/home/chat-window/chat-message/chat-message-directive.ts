module ChatMessage {
  'use strict';

  function ChatMessageDirective(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {
        message: '='
      },
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
    public message;
    private $scope;
    public static $inject: Array<string> = [
        '$scope'
    ];

    constructor($scope) {
      this.$scope = $scope;
      this.message = {
        avatar: this.$scope.message.avatar,
        message: this.$scope.message.message,
        name: this.$scope.message.name.split(' ')[0]
      };
      /**
       * Chat message constructor
       */
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
