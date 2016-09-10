///<reference path='../../../typings/index.d.ts' />
module Messages {
  'use strict';

  export class Messages {
    public messages: AngularFireArray = null;
    private $firebaseArray: AngularFireArrayService;
    public static $inject: Array<string> = [
      '$firebaseArray',
    ];

    constructor($firebaseArray: AngularFireArrayService) {
      this.$firebaseArray = $firebaseArray;
    }

    public getChat() {
      return this.messages;
    }

    public setChat(courtId) {
      //noinspection TypeScriptUnresolvedVariable
      this.messages = this.$firebaseArray(new firebase.database().ref().child(`courts/court${courtId}/messages`));
    }

    public wipeChat() {
      this.messages = null;
    }

    public sendMessage(message, author) {
      if (message !== null && message !== '') {
        let newMessage = {
          message: message,
          name: author.displayName.split(' ')[0],
          avatar: author.photoURL,
          uuid: author.uid
        };
        this.messages.$add(newMessage);
      }
    }

  }

  /**
   * @ngdoc service
   * @name home.service:Messages
   *
   * @description
   *
   */
  angular
    .module('home')
    .service('Messages', Messages);
}
