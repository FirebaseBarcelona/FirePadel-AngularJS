///<reference path='../../../typings/tsd.d.ts' />
module Court {
  'use strict';

  export class Court {
    public static $inject: Array<string> = [];

    constructor() {
    }

    public getCourts() {
      return firebase.database().ref().child('courts');
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
