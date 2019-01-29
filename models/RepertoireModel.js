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

module.exports.recupererVips = function(lettre, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT p.PHOTO_ADRESSE AS adrPhoto, v.VIP_NUMERO AS vipNumero, v.VIP_PRENOM AS prenomVip, v.VIP_NOM AS nomVip FROM vip v, photo p " +
                      "WHERE v.VIP_NUMERO = p.VIP_NUMERO AND v.VIP_NOM LIKE '"+lettre+"%' AND p.PHOTO_NUMERO = 1 ORDER BY nomVip ASC";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};