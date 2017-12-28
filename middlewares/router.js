const express = require('express');
const genSql = require(__dirname+'/../lib/gensql');
const myfunc = require(__dirname+'/../lib/myfunc');
const mysql  = require(__dirname+'/../lib/mysqldb');
const Promise = require('bluebird');

var router = express.Router();

router.get('/users', function(req, res){
    
});

router.get('/user/:id', function(req,res) {

});

router.post('/newuser', function(req, res){
    var name = req.body.name;
    var uuid = myfunc.gen_nonce_number(10);//req.body.uuid;
    var sql = genSql.create_user(name, uuid);
    mysql.get_connection().execute(sql, function(err){
        if (!err) {
            res.send(myfunc.format_ret(0, 'ok'));
        }else{
            res.send(myfunc.format_ret(-1, err));
        }
    });
    
});

router.post('/login', function(req,res){
    var name = req.body.name;
    // 这里要研究一下怎么做promise
    var sql = genSql.select_user_by_name(name);
    var login = new Promise(function(resolve){
        mysql.get_connection().execute(sql, resolve);
    });

    var token = myfunc.gen_nonce(6);   
    var login = new Promise(function(resolve, reject){
       mysql.get_connection().execute(sql, function(err, rows){
            if (!err && rows[0]) {
                resolve(rows[0]);
            }else{
                reject('select by name err ->' + err);
            }
       });
    });

    login.then(function(player){
        var update_login = new Promise(function (resolve, reject){
            var token = myfunc.gen_nonce(6);
            var sql = genSql.update_user_login(player.id, token);
            mysql.get_connection().query(sql, function(err, result){
                console.log('err ?->' + err);
                if (!err && result.changedRows != 0){
                    resolve(token);
                }else if (result.changedRows == 0){
                    reject('login faild');
                }else{
                    reject('update login status err ->' + err);
                }
            });
        })
        return update_login;
    }).then(function(token){
        res.send(myfunc.format_ret(0, 'ok', token));
    }).catch(function(err){
        res.send(myfunc.format_ret(-1, err));
    });
    
});

module.exports = router;

