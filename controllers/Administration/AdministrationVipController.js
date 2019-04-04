let async = require('async');
let AdministrationVipModel = require('../../models/Administration/AdministrationVipModel');
let AdministrationPhotoModel = require('../../models/Administration/AdministrationPhotoModel');
let VipModel = require('../../models/VipModel');

module.exports.AjouterVip = function(request, response) {
    async.parallel([ function(callback) {
        AdministrationVipModel.recupererNationalitesPourVip(function(err, result) { callback(err, result); })
    }], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.nationalites = result[0];
        response.render('ajouterVip', response);
    });
};

module.exports.ConfirmerAjoutVip = function(request, response) {
    let nomVip = request.body.nomVip;
    let prenomVip = request.body.prenomVip;
    let genreVip = request.body.genreVip;
    let naissanceVip = request.body.naissanceVip;
    let nationaliteVip = request.body.nationaliteVip;
    let commentaireVip = request.body.commentaireVip;

    let photo = request.files.imageVip;
    let nomFichierPhoto = request.files.imageVip.name;
    let emplacementPhoto = './public/images/vip/' + nomFichierPhoto;
    let sujetPhoto = request.body.titrePhoto;
    let commentairePhoto = request.body.commentairePhoto;

    AdministrationVipModel.ajouterVip(nomVip, prenomVip, genreVip, naissanceVip, nationaliteVip, commentaireVip, function(err, result) {
        if (err) {
            CallbackInsertionVip(response, err, result);
        } else {
            async.parallel([ function(callback) {
                AdministrationPhotoModel.AjouterDonneesPhoto(1, sujetPhoto, commentairePhoto, nomFichierPhoto, result.insertId, function(err, result) { callback(err, result)})
            }, function(callback) {
                photo.mv(emplacementPhoto, function (err) { callback(err) });
            }], function(err, result) {
                CallbackInsertionVip(response, err, result);
            });
        }
    });
};

let CallbackInsertionVip = function (response, err, result) {
    let resultatInsertion = true;
    if (err) {
        console.log(err);
        resultatInsertion = false;
    }
    response.resultatInsetion = resultatInsertion;
    response.render('resultatInsertionVip', response);
};

module.exports.ModifierVip = function(request, response) {
    async.parallel([ function(callback) {
        VipModel.recupererNomsEtPrenomsVip(function (err, result) { callback(err, result); })
    }], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.vips = result[0];
        response.render('selectionVip', response);
    });
};

module.exports.ModifierDonneesVip = function(request, response) {
    let vipNumero = request.body.vipSelectionne;
    async.parallel([ function(callback) {
        VipModel.recupererInformationsVip(vipNumero, function(err, result) { callback(null, result); })
    }, function (callback) {
        AdministrationVipModel.recupererNationalitesPourVip(function(err, result) { callback(null, result); })
    }], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.vipPrenom = result[0][0].vipPrenom;
        response.vipNom = result[0][0].vipNom;
        response.vipNaissance = result[0][0].vipNaissance;
        response.nationalite = result[0][0].numNationalite;
        response.vipTexte = result[0][0].vipTexte;
        response.genreVip = result[0][0].vipSexe;
        response.idVip = vipNumero;
        response.nationalites = result[1];
        response.render('modifierVip', response);
    });
};

module.exports.ConfirmerModificationVip = function(request, response) {
    let nomVip = request.body.nomVip;
    let prenomVip = request.body.prenomVip;
    let genreVip = request.body.genreVip;
    let naissanceVip = request.body.naissanceVip;
    let nationaliteVip = request.body.nationaliteVip;
    let commentaireVip = request.body.commentaireVip;
    let idVip = request.body.idVip;

    async.parallel([function (callback) {
        AdministrationVipModel.modifierVip(nomVip, prenomVip, genreVip, naissanceVip, nationaliteVip, commentaireVip, idVip, function(err, result) { callback(null, result);})
    }], function(err, result) {
        let resultatModification = true;
        if (err) {
            console.log(err);
            resultatModification = false;
        }
        response.resultatModification = resultatModification;
        response.render('resultatModificationVip', response);
    })
};

module.exports.SupprimerVip = function(request, response) {
    async.parallel([ function(callback) {
        VipModel.recupererNomsEtPrenomsVip(function (err, result) { callback(err, result); })
    }], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.vips = result[0];
        response.render('suppressionVip', response);
    });
};

module.exports.ConfirmerSuppressionVip = function(request, response) {
    let idVip = request.body.idVip;
    async.parallel([function (callback) {
        AdministrationVipModel.supprimerVip(idVip, function(err, result) { callback(null, result); })
    }], function(err, result) {
        let resultatSuppression = true;
        if (err) {
            console.log(err);
            resultatSuppression = false;
        }
        response.resultatSuppression = resultatSuppression;
        response.render('confirmationSuppressionVip', response);
    })
};
