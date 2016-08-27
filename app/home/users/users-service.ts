///<reference path='../../../typings/tsd.d.ts' />
module Users {
  'use strict';

  interface IUser {
    uuid: string,
    name: string,
    email: string,
    avatar: string
  }
  class Users {
    private userData: IUser;
    public static $inject: Array<string> = [];

    constructor() {

    }

    public setUserData(userData) {
      this.userData = {
        email: userData.email,
        uuid: userData.uid,
        avatar: userData.photoURL,
        name: userData.displayName
      }
    }
    public getUserData() {
      return this.userData;
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
