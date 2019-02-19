let db = require('../configDb');

module.exports.recupererVipsAvecArticles = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT v.VIP_NUMERO as vipNumero, v.VIP_NOM as vipNom, v.VIP_PRENOM as vipPrenom FROM vip v, apoursujet a WHERE a.VIP_NUMERO = v.VIP_NUMERO";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};