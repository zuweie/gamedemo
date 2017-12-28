const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const routing = require(__dirname+'/middlewares/router');
const gameHub = require(__dirname+'/lib/gamehub');
//var gameManager = require(__dirname+"/lib/gamehub");


// init webserver
app.use(bodyParser.urlencoded({extended: false}));
app.use("/", routing);
app.use('/regist', function (req,res) {
    res.sendFile(__dirname + '/public/api.html');
});
app.use('/game', function(req, res){
    res.sendFile(__dirname+'/public/playground.html');
});

gameHub.init(http);

// init game
//gameManager.init_gamehub(http);

http.listen(3000, ()=>{console.log('game server listeneing on port 3000')});


