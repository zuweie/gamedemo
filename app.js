const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const routing = require(__dirname+'/middlewares/router');
const gameHub = require(__dirname+'/lib/gamehub');
//var gameManager = require(__dirname+"/lib/gamehub");


// init webserver
app.all('*', function(req, res, next){
    res.header('Access-Control-Allow-Origin:*');
    next();
});
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
let port = process.argv[2] || 3000;
http.listen(port, ()=>{console.log('game server listeneing on port '+port)});


