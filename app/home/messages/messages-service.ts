///<reference path='../../../typings/tsd.d.ts' />
module Messages {
  'use strict';

  class Messages {
    public messages: AngularFireArray;
    private $firebaseArray: AngularFireArrayService;
    public static $inject: Array<string> = [
      '$firebaseArray'
    ];

    constructor($firebaseArray: AngularFireArrayService) {
      this.$firebaseArray = $firebaseArray;
    }

    public getChat() {
      return this.messages;
    }

    public setChat(courtId) {
      this.messages = this.$firebaseArray(new firebase.database().ref().child(`courts/court${courtId}/messages`));
    }

    public sendMessage(message, author) {
      if (message !== null && message !== '') {
        let newMessage = {
          message: message,
          name: author.displayName,
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
