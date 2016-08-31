///<reference path='../../../typings/tsd.d.ts' />
module Messages {
  'use strict';

  class Messages {
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
      this.messages = this.$firebaseArray(new firebase.database().ref().child(`courts/court${courtId}/messages`));
      /**
      this.$firebaseArray(new firebase.database().ref().child(`courts/court${courtId}/messages`)).$watch((e) => {
        if (Notification.permission !== 'granted') {
          Notification.requestPremission();
        }
        let n = new Notification(e.key);
      });
       **/
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
