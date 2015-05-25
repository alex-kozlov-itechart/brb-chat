function PrivateRoomModel(u) {
    'use strict';

    this.user = u;
    this.messages = [];
    this.unreadMessages = [];
}

PrivateRoomModel.prototype.sendMessage = function(msg) {
    this.unreadMessages.push(msg);
};
