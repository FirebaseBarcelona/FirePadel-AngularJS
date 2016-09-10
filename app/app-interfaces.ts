module firePadel {
  'use strict';
  export interface IUser {
    name: string,
    email: string,
    photoURL?: string,
    displayName?: string,
    uuid: string,
    uid?: string,
    avatar: string
  }
  export interface ICourtUser extends IUser {
    joined: boolean;
  }
  export interface IMessage extends AngularFireArray {
    message: string,
    avatar: string,
    name: string,
    uuid: string
  }
  export interface ICourt extends AngularFireObject {
    messages: Array<IMessage>
    users: Array<ICourtUser>
  }

}
