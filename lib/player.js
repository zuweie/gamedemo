function Player (context, socket) {
    this.context = context || {};
    this.io      = socket;
    this.inRoom  = false;
    this.reflect();
    this.on_offline();
}

Player.prototype.join_room = function (room){
    this.room = room;
    this.inRoom = true;
    this.io.join(room.get_roomId());
}

Player.prototype.leave_room = function () {
    if (this.room){
        this.io.leave(this.room.get_roomId());
        this.room = null;
    }
    this.inRoom = false;
}

/* 告诉自己那个客户端一些动作  */
Player.prototype._action = function (action) {
    if (this.inRoom && this.room.is_playing()){
        this.io.emit('action', action);        
    }else{
        
    }
}

/* 告诉别人的客户端一些动作 */
Player.prototype.action_ = function (action) {
    if (this.inRoom && this.room.is_playing()) {
        this.io.to(this.room.get_roomId()).emit('action', action);
    }else if (this.room.is_waiting()){
        this._speak('游戏还未开始，莫要乱动！');
    }
}

// 当有动作过来，要告诉另外其他人自己干嘛了。
Player.prototype.reflect = function () {
    let _that = this;
    this.io.on('action', function(msg){
        _that.action_(msg);
    });
}

Player.prototype.on_offline = function() {
    let _that = this;
    this.io.on('disconnect', function (err) {
        // 断了就让他断了。
        console.log(_that.get_name() + ' 断线了');
        _that.room.over_game(_that);
    });
}

Player.prototype._speak = function (msg) {
    if (this.inRoom){
        this.io.emit('speak', msg);
    }
}

Player.prototype.speak_  = function (){
    if (this.inRoom) {
        this.io.to(this.room.get_roomId()).emit('speak', msg);
    }
}

Player.prototype.set_context = function (row) {
    this.context = row;
}

Player.prototype.get_name = function () {
    return this.context.name;
}

Player.prototype.get_id = function () {
    return this.context.id;
}

module.exports = Player;