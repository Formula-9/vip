let async = require('async');

let RepertoireModel = require('../models/RepertoireModel');
let VipModel = require('../models/VipModel');

// ///////////////////////// R E P E R T O I R E    D E S     S T A R S

module.exports.Repertoire = function (request, response) {
    response.title = 'Répertoire des stars';
    RepertoireModel.recupererLettres(function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.tableLettres = result;
        response.render('repertoire', response);
    });
};

module.exports.RepertoireLettre = function(request, response) {
    response.title = 'Répertoire des stars';
    async.parallel([ function (callback) {
        RepertoireModel.recupererLettres(function (err, result) { callback(null, result) });
    }, function(callback) {
        RepertoireModel.recupererVips(request.params.lettre, function (err, result) { callback(null, result) });
    }], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.tableLettres = result[0];
        response.vips = result[1];
        response.render('repertoireVipsLettre', response);
    });
};

module.exports.DetailsVip = function(request, response) {
    let idVip = request.params.idVip;
    async.parallel([function (callback) {
        RepertoireModel.recupererLettres(function (err, result) { callback(null, result) });
    }, function (callback) {
        VipModel.recupererPhotoVipOfficielle(idVip, function(err, result) { callback(null, result) })
    }, function (callback) {
        VipModel.recupererNomEtPrenomVip(idVip, function (err, result) { callback(null, result) })
    }, function (callback) {
        VipModel.recupererDateNaissanceVip(idVip, function(err, result) { callback(null, result) })
    }, function (callback) {
        VipModel.recupererNationaliteVip(idVip, function(err, result) { callback(null, result) })
    }, function (callback) {
        VipModel.recupererTexteVip(idVip, function(err, result) { callback(null, result) })
    }, function (callback) {
        VipModel.recupererPhotosNonOfficielles(idVip, function(err, result) { callback(null, result) })
    }, function (callback) {
        VipModel.recupererPrincipauxFilms(idVip, function(err, result) { callback(null, result) })
    }, function (callback) {
        VipModel.recupererDefiles(idVip, function(err, result) { callback(null, result) })
    }, function (callback) {
        VipModel.recupererMariages(idVip, function(err, result) { callback(null, result) });
    }], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.tableLettres = result[0];
        response.photoOfficielle = result[1][0].adrPhoto;
        response.nomPrenomVip = result[2][0].vipPrenom + " " + result[2][0].vipNom;
        response.dateNaissance = result[3][0].vipNaissance;
        response.nationalite = result[4][0].vipNationalite;
        response.texteVip = result[5][0].texteVip;
        response.photosNonOfficielles = result[6];
        response.films = result[7];
        response.defiles = result[8];
        response.mariages = result[9];

        response.render('pageVip', response);
    });
};