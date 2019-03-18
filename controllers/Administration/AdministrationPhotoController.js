let async = require('async');
let VipModel = require('../../models/VipModel');
let AdministrationPhotoModel = require('../../models/Administration/AdministrationPhotoModel');

module.exports.AjouterPhoto = function(request, response) {
    async.parallel([ function(callback) {
        VipModel.recupererNomsEtPrenomsVip(function(err, result) { callback(null, result); })
    }], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.nomsEtPrenoms = result[0];
        response.render('ajouterPhoto', response);
    });
};

let CallbackInsertion = function(response, err, result) {
    let insertionOk = false;
    if (err) {
        console.log(err);
    } else {
        insertionOk = true;
    }
    response.insertionOk = insertionOk;
    response.render('resultatInsertionPhoto', response);
};

module.exports.AjouterDonneesPhoto = function(request, response) {
    let idVip = request.body.idVip;
    let commentairePhoto = request.body.commentairePhoto;
    let sujetPhoto = request.body.titrePhoto;
    let photo = request.files.adressePhoto;
    let nomFichierPhoto = request.files.adressePhoto.name;
    let emplacementPhoto = './public/images/vip/' + nomFichierPhoto;

    VipModel.recupererNombrePhotosPourVip(idVip, function(err, result) {
        if (err) {
            CallbackInsertion(response, err, result);
        } else {
            let numeroPhoto = result[0]['nbPhotos'] + 1;
            async.parallel([ function(callback) {
                AdministrationPhotoModel.AjouterDonneesPhoto(numeroPhoto, sujetPhoto, commentairePhoto, nomFichierPhoto, idVip, function(err, result) { callback(err, result)})
            }, function (callback) {
                photo.mv(emplacementPhoto, function(err) { callback(err)})
            }], function(err, result) {
                CallbackInsertion(response, err, result);
            });
        }
    });
};