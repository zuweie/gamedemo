/* 只用 mysql */
const mysql   = require('mysql2');
const bluebird = require('bluebird');

function MysqlDB () {
    this.config;
    this.connpool;
}

MysqlDB.prototype.get_connection = function (dbconfig) {

    if (!this.config) {
        this.config = dbconfig || this.load_config();
    }

    if (!this.connpool) {
        this.connpool = mysql.createPool(this.config);
    }
    return this.connpool;
}

MysqlDB.prototype.load_config = function () {
    const fs = require('fs');
    var config = fs.readFileSync(__dirname+'/../dbconfig.json');
    return JSON.parse(config);
}

var mysqldb = new MysqlDB();

module.exports = mysqldb;
