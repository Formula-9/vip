let db = require('../../configDb');

module.exports.recupererNationalitesPourVip = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT NATIONALITE_NUMERO as numero, NATIONALITE_NOM as nom FROM nationalite n";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.ajouterVip = function (nomVip, prenomVip, genreVip, naissanceVip, nationaliteVip, commentaireVip, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "INSERT INTO vip(NATIONALITE_NUMERO, VIP_NOM, VIP_PRENOM, VIP_SEXE, VIP_NAISSANCE, VIP_TEXTE, VIP_DATE_INSERTION) " +
                "VALUES (" + nationaliteVip + ", '" + nomVip + "', '" + prenomVip + "', '" + genreVip + "', '" + naissanceVip +
                "', '" + commentaireVip + "', NOW())";
            //console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.modifierVip = function (nomVip, prenomVip, genreVip, naissanceVip, nationaliteVip, commentaireVip, idVip, callback) {
    db.getConnection(function (err, connexion) {
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

module.exports.supprimerVip = function (idVip, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let tables_base = ["defiledans", "defile", "couturier", "comporte", "photo", "apoursujet", "article", "apouragence",
                               "mannequin", "chanteur", "composer", "acteur", "joue", "realisateur" ];
            let tables_doubles = [ "mariage", "liaison" ];
            tables_base.forEach(table => {
                connexion.query(`DELETE FROM ${table} WHERE VIP_NUMERO = ${idVip}`, null);
            });
            tables_doubles.forEach(table => {
                connexion.query(`DELETE FROM ${table} WHERE VIP_NUMERO = ${idVip} OR VIP_VIP_NUMERO = ${idVip}`, null);
            });
            connexion.query(`DELETE FROM vip WHERE VIP_NUMERO = ${idVip}`, callback);
            connexion.release();
        }
    });
};