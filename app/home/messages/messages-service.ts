///<reference path='../../../typings/tsd.d.ts' />
module Messages {
  'use strict';

  class Messages {
    public static $inject: Array<string> = [
    ];

    constructor() {
    }

    get(): string {
      return 'Messages';
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
