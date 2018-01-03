var myfunc = require('./myfunc');

function GameRoom () {
    this.players = [];
    this.roomId  = myfunc.gen_nonce(10)+'@'+(Date.now()); 
    this.roomStatus = 'waiting';
}

GameRoom.prototype.add_player = function (player){
    player.join_room(this);
    this.players.push(player);
    this.speakto_all(player.get_name() + ' has join the room ' + this.get_roomId());

    
    if (this.players.length == 2) {
        this.set_status('playing');
        this.speakto_all(this.get_roomId() + ': start the game !');
    }
}

GameRoom.prototype.speakto_all = function(msg) {
    this.players.forEach(function(player){
        player._speak(msg);
    });
}

GameRoom.prototype.over_game = function (leave){

    for (let i=0; i<this.players.length; ++i) {
        let player = this.players[i];
        if (player != leave){
            player._speak(leave.get_name() + ' 已经离开房间 ' + this.get_roomId() + '。 -> the game is over, the winner is you !!!');
            player.io.disconnect();
        }
    }

    this.players = [];
    this.set_status('waiting');    
}

GameRoom.prototype.set_status = function(status) {
    this.roomStatus = status;
}

GameRoom.prototype.get_status = function() {
    return this.roomStatus;
}

GameRoom.prototype.is_playing = function () {
    return this.roomStatus === 'playing';
}

GameRoom.prototype.is_waiting = function () {
    return this.roomStatus === 'waiting';
}

GameRoom.prototype.get_roomId = function () {
    return this.roomId;
}



module.exports = GameRoom;