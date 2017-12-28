var expect = require('chai').expect;
var auth = require(__dirname+'/../lib/auth');

describe('test auth', function(){
    it('test login', function(){
        var result = auth.login('alice');
        console.log(result);
        expect(result).to.be.not.eql('123456');
    });
});