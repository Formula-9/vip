let db = require('../../configDb');
module.exports.AjouterDonneesPhoto = function(numeroPhoto, titre, commentaire, adresse, idVip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "INSERT INTO photo VALUES (" + numeroPhoto +
                      ", '" + idVip + "', '" + titre + "', '" + commentaire + "', '" + adresse + "');";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.RecupererToutesLesPhotos = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT PHOTO_ADRESSE AS adresse FROM PHOTO";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.SupprimerDonneesPhoto = function(cheminPhoto, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "DELETE p, c FROM photo p JOIN comporte c ON c.PHOTO_NUMERO = p.PHOTO_NUMERO WHERE p.PHOTO_ADRESSE = '" + cheminPhoto + "'";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};