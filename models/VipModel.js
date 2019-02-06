let db = require('../configDb');

module.exports.recupererPhotoVipOfficielle = function(idVip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT p.PHOTO_ADRESSE AS adrPhoto FROM photo p WHERE p.PHOTO_NUMERO = 1 AND p.VIP_NUMERO = " + idVip;
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.recupererNomEtPrenomVip = function(idVip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT v.VIP_PRENOM AS vipPrenom, v.VIP_NOM AS vipNom FROM vip v WHERE v.VIP_NUMERO = " + idVip;
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.recupererDateNaissanceVip = function(idVip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT v.VIP_NAISSANCE AS vipNaissance FROM vip v WHERE v.VIP_NUMERO = " + idVip;
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.recupererNationaliteVip = function(idVip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT n.NATIONALITE_NOM AS vipNationalite FROM vip v, nationalite n WHERE v.NATIONALITE_NUMERO = n.NATIONALITE_NUMERO AND v.VIP_NUMERO = " + idVip;
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.recupererTexteVip = function(idVip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT v.VIP_TEXTE AS texteVip FROM vip v WHERE v.VIP_NUMERO = " + idVip;
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.recupererPhotosNonOfficielles = function(idVip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT p.PHOTO_ADRESSE AS adrPhoto FROM photo p WHERE p.PHOTO_NUMERO != 1 AND p.VIP_NUMERO = " + idVip;
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.estVipMannequin = function(idVip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT 'Mannequin' AS estMannequin FROM mannequin WHERE VIP_NUMERO = " + idVip;
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.estActeur = function(idVip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT 'Acteur' AS estActeur FROM acteur WHERE VIP_NUMERO = " + idVip;
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.recupererPrincipauxFilms = function(idVip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT f.FILM_TITRE AS nomFilm, f.FILM_DATEREALISATION AS dateRealisation FROM film f, joue j WHERE  f.FILM_NUMERO = j.FILM_NUMERO AND j.VIP_NUMERO = " + idVip;
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};