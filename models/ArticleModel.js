let db = require('../configDb');

module.exports.recupererVipsAvecArticles = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT v.VIP_NUMERO as vipNumero, v.VIP_NOM as vipNom, v.VIP_PRENOM as vipPrenom FROM vip v, apoursujet a WHERE a.VIP_NUMERO = v.VIP_NUMERO ORDER BY v.VIP_NOM";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.recupererArticlesVip = function(idVip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT a.ARTICLE_DATE_INSERT as dateInsertion, a.ARTICLE_RESUME as resumeArticle FROM article a, apoursujet ap WHERE a.ARTICLE_NUMERO = ap.ARTICLE_NUMERO AND ap.VIP_NUMERO = " + idVip;
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};