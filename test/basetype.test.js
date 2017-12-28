const expect = require('chai').expect;

describe('test javascript base type', function(){
    it('test null undefined', function(){
        let what; 
        if (!null){
            what = false; 
        }else{
            what = true;
        }
        expect(what).to.be.equal(false);
    });
});