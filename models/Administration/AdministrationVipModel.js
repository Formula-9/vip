let db = require('../../configDb');

module.exports.recupererNationalitesPourVip = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT NATIONALITE_NUMERO as numero, NATIONALITE_NOM as nom FROM nationalite n";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.ajouterVip = function(nomVip, prenomVip, genreVip, naissanceVip, nationaliteVip, commentaireVip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "INSERT INTO vip(NATIONALITE_NUMERO, VIP_NOM, VIP_PRENOM, VIP_SEXE, VIP_NAISSANCE, VIP_TEXTE, VIP_DATE_INSERTION) " +
                      "VALUES (" + nationaliteVip + ", '" + nomVip + "', '" + prenomVip + "', '" + genreVip + "', '" + naissanceVip +
                      "', '" + commentaireVip +"', NOW())";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.modifierVip = function(nomVip, prenomVip, genreVip, naissanceVip, nationaliteVip, commentaireVip, idVip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "UPDATE vip SET NATIONALITE_NUMERO = " + nationaliteVip + ", VIP_NOM = '" + nomVip + "', VIP_PRENOM = '" + prenomVip +
                      "', VIP_SEXE = '" + genreVip + "', VIP_NAISSANCE = '" + naissanceVip + "', VIP_TEXTE = '" + commentaireVip +
                      "' WHERE VIP_NUMERO = " + idVip;
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

//TODO: Ne supprime pas la ligne ?
module.exports.supprimerVip = function(idVip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = `DELETE FROM defiledans WHERE VIP_NUMERO = ${idVip};
                       DELETE FROM defile WHERE VIP_NUMERO = ${idVip};
                       DELETE FROM couturier WHERE VIP_NUMERO = ${idVip};
                       DELETE FROM comporte WHERE VIP_NUMERO = ${idVip};
                       DELETE FROM photo WHERE VIP_NUMERO = ${idVip};
                       DELETE FROM apoursujet WHERE VIP_NUMERO = ${idVip};
                       DELETE FROM article WHERE ARTICLE_NUMERO = ${idVip};
                       DELETE FROM apouragence WHERE VIP_NUMERO = ${idVip};
                       DELETE FROM mannequin WHERE VIP_NUMERO = ${idVip};
                       DELETE FROM chanteur WHERE VIP_NUMERO = ${idVip};
                       DELETE FROM composer WHERE VIP_NUMERO = ${idVip};
                       DELETE FROM acteur WHERE VIP_NUMERO = ${idVip};
                       DELETE FROM joue WHERE VIP_NUMERO = ${idVip};
                       DELETE FROM realisateur WHERE VIP_NUMERO = ${idVip};
                       DELETE FROM mariage WHERE VIP_NUMERO = ${idVip};
                       DELETE FROM mariage WHERE VIP_VIP_NUMERO = ${idVip};
                       DELETE FROM liaison WHERE VIP_NUMERO = ${idVip};
                       DELETE FROM vip WHERE VIP_NUMERO = ${idVip};`;
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};