let async = require('async');
let fs = require('fs');
let VipModel = require('../../models/VipModel');
let AdministrationPhotoModel = require('../../models/Administration/AdministrationPhotoModel');

module.exports.AjouterPhoto = function (request, response) {
    async.parallel([function (callback) {
        VipModel.recupererNomsEtPrenomsVip(function (err, result) {
            callback(null, result);
        })
    }], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.nomsEtPrenoms = result[0];
        response.render('ajouterPhoto', response);
    });
};

let CallbackInsertion = function (response, err, result) {
    let insertionOk = true;
    if (err) {
        insertionOk = false;
        console.log(err);
    }
    response.insertionOk = insertionOk;
    response.render('resultatInsertionPhoto', response);
};

module.exports.AjouterDonneesPhoto = function (request, response) {
    let idVip = request.body.idVip;
    let commentairePhoto = request.body.commentairePhoto;
    let sujetPhoto = request.body.titrePhoto;
    let photo = request.files.adressePhoto;
    let nomFichierPhoto = request.files.adressePhoto.name;
    let emplacementPhoto = './public/images/vip/' + nomFichierPhoto;

    VipModel.recupererNombrePhotosPourVip(idVip, function (err, result) {
        if (err) {
            CallbackInsertion(response, err, result);
        } else {
            let numeroPhoto = result[0]['nbPhotos'] + 1;
            async.parallel([function (callback) {
                AdministrationPhotoModel.AjouterDonneesPhoto(numeroPhoto, sujetPhoto, commentairePhoto, nomFichierPhoto, idVip, function (err, result) {
                    callback(err, result)
                })
            }, function (callback) {
                photo.mv(emplacementPhoto, function (err) {
                    callback(err)
                })
            }], function (err, result) {
                CallbackInsertion(response, err, result);
            });
        }
    });
};

module.exports.SelectionPhotoASupprimer = function (request, response) {
    async.parallel([function (callback) {
        AdministrationPhotoModel.RecupererToutesLesPhotos(function(err, result) { callback(err, result); })
    }], function (err, result) {
        console.log(result[0]);
        response.listePhotos = result[0];
        response.render('selectionPhoto', response);
    })
};

let CallbackSuppression = function (response, err, result) {
    let insertionOk = false;
    if (err) {
        console.log(err);
    } else {
        insertionOk = true;
    }
    response.insertionOk = insertionOk;
    response.render('resultatSuppressionPhoto', response);
};

module.exports.SupprimerPhoto = function (request, response) {
    let cheminPhoto = request.body.cheminPhoto;
    let emplacementPhoto = './public/images/vip/';
    async.parallel([function (callback) {
        AdministrationPhotoModel.SupprimerDonneesPhoto(cheminPhoto, function (err) { callback(err)});
    }, function (callback) {
        fs.unlink(emplacementPhoto + cheminPhoto, function (err) { callback(err) });
    }], function (err, result) {
        CallbackSuppression(response, err, result);
    })
};