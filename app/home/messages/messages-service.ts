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
      this.$firebaseArray(new firebase.database().ref().child(`courts/court${courtId}/messages`)).$loaded((messages) => {
        this.messages = messages;
      });
    }
    
    public sendMessage(message, author) {
      console.log(message);
      console.log(author);
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
