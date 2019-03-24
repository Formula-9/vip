let db = require('../configDb');

module.exports.RecupererPhotoEtCommentairePourVip = function(idVip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT PHOTO_COMMENTAIRE AS commentaire, PHOTO_ADRESSE AS adresse FROM PHOTO WHERE VIP_NUMERO = " + idVip;
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.RecupererPremierePhotoVip = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT p.VIP_NUMERO AS vipNumero, p.PHOTO_ADRESSE AS adrPhoto FROM photo p, vip v WHERE " +
                      "p.VIP_NUMERO = v.VIP_NUMERO AND p.PHOTO_NUMERO = 1 ORDER BY VIP_NOM";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};