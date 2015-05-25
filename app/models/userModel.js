function UserModel(user) {
    'use strict';
    this.id = user._id;
    this.username = user.username;
    this.chatRoom = user.chatRoom;
    this.socketId = user.socketId;
    this.socket = null;
    this.registrationDate = user.registrationDate;
    this.lastLoginDate = user.lastLoginDate;
}