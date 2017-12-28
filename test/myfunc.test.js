var expect = require('chai').expect;
var myfunc = require(__dirname+'/../lib/myfunc');

describe('test myfunc', function(){
    it('test nonce', function(){
        var nonce = myfunc.gen_nonce(6);
        expect(nonce).to.be.not.eql('123456');
    });
});