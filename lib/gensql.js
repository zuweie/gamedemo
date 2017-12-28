var criterion = require('criterion');
var sqlString = require('sqlstring');
var genSql = {};

genSql.select_user_by_name = function (name) {
    var c = criterion({name:name});
    return sqlString.format('SELECT * FROM `users` WHERE '+c.sql(), c.params());
}

genSql.select_user_by_accesstoken = function (accesstoken) {
    var c = criterion({access_token:accesstoken});
    var sql = sqlString.format('SELECT * FROM `users` where '+c.sql(), c.params());
    return sql;
}

genSql.update_user_login = function (userid, access_token) {
    var c = criterion({id:userid});
    var data = this.add_timestamp_to({access_token: access_token, login_time: Date.now()/1000}, 2);
    var update_sql =  sqlString.format('UPDATE `users` SET ?', data);
    update_sql = sqlString.format(update_sql + ' WHERE ' + c.sql(), c.params());
    return update_sql;
}

genSql.create_user =  function (name, uuid) {
    return this.insert_format_sql('users', {name:name, uuid:uuid});
};

genSql.insert_format_sql = function (table, data) {
    this.add_timestamp_to(data);
    return sqlString.format('INSERT INTO `'+table+'` SET ?', data);
}

genSql.add_timestamp_to = function (data, what) {
    var dowhat;
    var dodata;

    if (typeof what != 'undefined') {
        dowhat = what;
    }else{
        dowhat = 3;
    }

    if (typeof data != 'undefined'){
        dodata = data;
    }else{
        dodata = {};
    }
    var now = Date.now()/1000;

    if ((dowhat & 1) != 0 && typeof dodata.created_at == 'undefined') {
        dodata.created_at = now;
    }

    if ((dowhat & 2) != 0 && typeof dodata.updated_at == 'undefined') {
        dodata.updated_at = now;
    }
    return dodata;
}

module.exports = genSql;


