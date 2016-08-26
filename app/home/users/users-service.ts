///<reference path='../../../typings/tsd.d.ts' />
module Users {
  'use strict';

  interface IUser {
    id: string,
    name: string,
    avatar: string
  }
  class Users {

    public static $inject: Array<string> = [];

    constructor() {

    }


  }

  /**
   * @ngdoc service
   * @name home.service:Users
   *
   * @description
   *
   */
  angular
    .module('home')
    .service('Users', Users);
}
