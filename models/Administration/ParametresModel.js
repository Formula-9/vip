let db = require('../../configDb');

module.exports.recupererMotDePasseCryptePourLogin = function(login, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT PASSWD p FROM parametres WHERE LOGIN = '" + login + "'";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};