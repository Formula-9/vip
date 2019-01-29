let db = require('../configDb');

module.exports.recupererLettres = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT SUBSTRING(VIP_NOM, 1, 1) AS lettre FROM vip";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};