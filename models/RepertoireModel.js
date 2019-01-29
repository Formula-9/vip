let db = require('../configDb');

module.exports.recupererLettres = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT SUBSTRING(VIP_NOM, 1, 1) AS lettre FROM vip ORDER BY lettre ASC";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.recupererNoms = function(lettre, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT VIP_PRENOM AS prenomVip, VIP_NOM AS nomVip FROM vip WHERE VIP_NOM LIKE '"+lettre+"%' ORDER BY nomVip ASC";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};