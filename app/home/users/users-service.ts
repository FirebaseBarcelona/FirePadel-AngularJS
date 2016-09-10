module Users {
  'use strict';

  export class Users {
    private userData: firePadel.IUser;
    public static $inject: Array<string> = [];

    constructor() {
      this.userData = null;
    }

    public setUserData(userData: firePadel.IUser): void {
      this.userData = {
        email: userData.email,
        uuid: userData.uid,
        avatar: userData.photoURL,
        name: userData.displayName
      }
    }
    public getUserData(): firePadel.IUser {
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
