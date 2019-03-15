let db = require('../../configDb');

module.exports.recupererNationalitesPourVip = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT NATIONALITE_NUMERO as numero, NATIONALITE_NOM as nom FROM nationalite n";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};