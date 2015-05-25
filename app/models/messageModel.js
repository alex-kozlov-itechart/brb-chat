function MessageModel(user, msg) {
    'use strict';
    this.message = msg;
    this.postedDate = Date.now();
    this.author = {
        id: user.id,
        username: user.username
    };
}