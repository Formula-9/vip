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
            let sql = "SELECT p.PHOTO_ADRESSE AS adrPhoto, p.PHOTO_SUJET as sujetPhoto, p.PHOTO_COMMENTAIRE as commPhoto FROM photo p WHERE p.PHOTO_NUMERO != 1 AND p.VIP_NUMERO = " + idVip;
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

module.exports.recupererDefiles = function(idVip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT d.DEFILE_DATE as dateDefile, d.DEFILE_LIEU as lieuDefile, v_c.VIP_PRENOM as couturierPrenom, v_c.VIP_NOM as couturierNom, v_c.VIP_NUMERO as couturierNumero FROM vip v_d, vip v_c, defile d, defiledans dd WHERE v_d.VIP_NUMERO = " + idVip + " AND d.DEFILE_NUMERO = dd.DEFILE_NUMERO AND v_c.VIP_NUMERO = d.VIP_NUMERO";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.recupererMariages = function(idVip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT v.VIP_NOM as nomConjoint, v.VIP_PRENOM as prenomConjoint, m.DATE_EVENEMENT as dateMariage, m.MARIAGE_LIEU as lieu, m.MARIAGE_FIN as finMariage, m.VIP_VIP_NUMERO as conjoint FROM mariage m, vip v WHERE m.VIP_NUMERO = " + idVip + " AND v.VIP_NUMERO = m.VIP_VIP_NUMERO\n" +
                      "UNION\n" +
                      "SELECT v.VIP_NOM as nomConjoint, v.VIP_PRENOM as prenomConjoint, m.DATE_EVENEMENT as dateMariage, m.MARIAGE_LIEU as lieu, m.MARIAGE_FIN as finMariage, m.VIP_NUMERO as conjoint FROM mariage m, vip v WHERE m.VIP_VIP_NUMERO = " + idVip + " AND v.VIP_NUMERO = m.VIP_NUMERO";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};