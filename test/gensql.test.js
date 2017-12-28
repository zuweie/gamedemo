var genSql = require(__dirname+'/../lib/gensql');
var expect = require('chai').expect;

describe('test timestamp', function(){
    it('test created_at', function(){
        var data = genSql.add_timestamp_to({hello:2}, 1);
        //console.log(data);
        expect(typeof data.created_at).to.be.not.equal('undefined');
    });

    it('test updated_at', function(){
        var data = genSql.add_timestamp_to({}, 2);
        expect(typeof data.updated_at).to.be.not.equal('undefined');
    });
});

describe('test sql', function (){
    it('test insert', function(){
        var sql = genSql.create_user('abc', '1234');
        console.log(sql);
        expect(sql).to.be.not.equal('');
    });
})

describe('test query sql', function(){
    it('test select by name', function(){
        var sql = genSql.select_user_by_name('Alice');
        console.log(sql);
        expect(sql).to.be.not.equal('');
    });
});

describe('test update sql', function(){
    it('test update by accesstoken', function (){
        var sql = genSql.update_user_login(1,'abcd');
        console.log(sql);
        expect(sql).to.be.not.equal('');
    });
});