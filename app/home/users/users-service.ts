///<reference path='../../../typings/tsd.d.ts' />
module Users {
  'use strict';

  class Users {
    public static $inject: Array<string> = [
    ];

    constructor() {
    }

    get(): string {
      return 'Users';
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
