///<reference path='../../../typings/tsd.d.ts' />
module Court {
  'use strict';

  class Court {
    private courts: AngularFireArray;
    private $firebaseArray: AngularFireArrayService;
    public static $inject: Array<string> = [
      '$firebaseArray'
    ];

    constructor($firebaseArray: AngularFireArrayService) {
      this.$firebaseArray = $firebaseArray;
    }

    public getCourts() {
      return firebase.database().ref().child('courts')
    }
  }

  /**
   * @ngdoc service
   * @name home.service:Court
   *
   * @description
   *
   */
  angular
    .module('home')
    .service('Court', Court);
}
