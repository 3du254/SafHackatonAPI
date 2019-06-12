var sqlDb = require("mssql");
var settings = require("../settings");

exports.executeSql = function (sql, callback) {
    var conn = new sqlDb.ConnectionPool(settings.dbConfig);//"mssql://sa:Shalom123.#@INTSOFT-01Z/3duERP");
    conn.connect()//"mssql://sa:Shalom123.#@INTSOFT-01Z/3duERP")
        .then(function () { 
            var req = new sqlDb.Request(conn);
            req.query(sql).then(function (recordset) {
                callback(recordset);
            }).catch(function (err) {
                callback(null, err);
            }) 
        })
        .catch(function (err) {
            console.log(err);
            callback(null, err);
        }); 
};