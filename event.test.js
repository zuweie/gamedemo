const events = require("events");

function Guy (name) {
    let _that = this;
    this.name = name;
    this.say  = new events.EventEmitter();
    this.saytime = 10;
    this.say.on('say', function(msg){
        console.log(_that.name + ' say : '+ msg);
        if (--_that.saytime != 0) {
            _that.saysomething();
        }
    });
}

Guy.prototype.saysomething = function() {
    this.say.emit('say', ' I am '+this.name + ' ('+this.saytime+')');
}

let alice = new Guy('alice');
let bob   = new Guy('bob');
bob.saysomething();
alice.saysomething();