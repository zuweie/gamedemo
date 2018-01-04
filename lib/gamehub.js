const Server = require('socket.io');
const Promise = require('bluebird');
var Player = require('./player');
var mysql  = require('./mysqldb');
var genSql = require('./gensql');
const GameRoom = require('./gameroom');

function GameHub(){
    this.roomlimit = 100;
    this.players   = [];
    this.rooms     = [];
};

GameHub.prototype.get_default_options = function () {
    return {
        path: '/gamehub',
        serveClient: false,
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: false
    };
}

GameHub.prototype.get_waiting_room = function () {
    let valid_room = null;
    if (this.rooms.length < this.roomlimit) {
        for(let i=0; i<this.rooms.length; ++i){
            if (this.rooms[i].is_waiting()){
                valid_room = this.rooms[i];
                break;
            }
        }
        if (!valid_room){
            // create a room;
            valid_room = new GameRoom();
            this.rooms.push(valid_room);
        }
    }
    return valid_room;
}

GameHub.prototype.init = function(http, options) {
    console.log('attach the httpserver');
    var opts = options || this.get_default_options();
    // 暴露自己给各位回调的大爷用。
    var _that = this;
    this.io = new Server();
    this.io.attach(http, opts);
    this.io.on('connection', (socket)=>{
        var token = socket.handshake.query.token;
        console.log('new socket id : ' + socket.id);
        if (typeof token != 'undefined'){
            const promise = new Promise(function(resolve, reject){
                mysql.get_connection().execute(
                    genSql.select_user_by_accesstoken(token), 
                    function(err, rows){
                        if (!err && rows[0]){
                            resolve(rows[0]);
                        }else{
                            reject('invalid token');
                        }
                    });
            });
            
            promise.then(function(playerdata){
                // 验证了这个socket链接的合法性
                var room = _that.get_waiting_room();
                if (room) {
                    var player = new Player(playerdata, socket);
                    console.log(playerdata.name + '加入了! ');
                    room.add_player(player);
                }else{
                    // 没有room 可以给他玩。
                    console.log('没有房间给 '+playerdata.name+' 玩了');
                    socket.disconnect(true);
                }
                
            }).catch(function(err){
                socket.disconnect(true);
            });
        }else{
            socket.disconnect(true);
        }

    });
}
var gameHub = new GameHub();
module.exports = gameHub;