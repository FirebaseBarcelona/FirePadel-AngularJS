///<reference path='../../../typings/tsd.d.ts' />
module ChatWindow {
  'use strict';

  function ChatWindowDirective(): ng.IDirective {
    return {
      restrict: 'EA',
      scope: {
        courtData: '='
      },
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
    private messageService: Messages.Messages;
    private authService: Auth.Auth;
    private message: string = null;
    public messages: Array;
    public name: string;
    private enterKeyCode: number = 13;
    public static $inject: Array<string> = [
      'Messages',
      'Auth'
    ];

    constructor(Messages: Messages.Messages, Auth: Auth.Auth) {
      this.name = 'chatWindow';
      this.messageService = Messages;
      this.authService = Auth;
      this.authorId = this.authService.getUserData().uid;
      this.getMessages();
    }

    public isInputFieldEmpty(): boolean {
      return (this.message !== null && this.message !== '');
    }
    private getMessages() {
      this.messages = this.messageService.getChat();
    }

    public inputKeyPress(keyCode) {
      if (keyCode === this.enterKeyCode) {
        this.sendMessage(this.message);
      }
    }

    public sendMessage(message) {
      this.messageService.sendMessage(message, this.authService.getUserData());
      this.message = null;
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
