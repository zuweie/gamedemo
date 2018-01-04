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
        this.speakto_all('game is going to start');
        this.start_game();
    }
}

GameRoom.prototype.speakto_all = function(msg) {
    this.players.forEach(function(player){
        player._speak(msg);
    });
}

GameRoom.prototype.start_game = function(what, msg) {
    this.set_status('playing');
    for(let i=0; i<this.players.length; ++i) {
        let player = this.players[i];
        let playerInfo = {name: player.get_name(), position: i+1, id:player.get_id(), blood:100};
        player._sendmsg('gamestartd', JSON.stringify(playerInfo));
    }
}


GameRoom.prototype.end_game = function (leave){

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