const Promise = require('bluebird');
var expect = require('chai').expect;

describe('test Promise', function(){
    it('test Promise then then then ...', function(){
        var promise = new Promise(function(onok, onfailed){
            onok('ok');
        });
        promise.then(function(msg){
            console.log('then 1 ' + msg);
            return Promise.resolve('then 1 -> then 2 ');
        }).then(function(msg){
            console.log('then 2 ' +msg);
            return Promise.reject('then2 -> err');
        }).then(function(msg){
            console.log('then 3 ' +msg);
        }).catch(function(err){
            console.log('err 4 ' + err);
        });
    });
});

