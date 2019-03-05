let db = require('../configDb');

module.exports.recupererMotDePasseCryptePourLogin = function(login, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};