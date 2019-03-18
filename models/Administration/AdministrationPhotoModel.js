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