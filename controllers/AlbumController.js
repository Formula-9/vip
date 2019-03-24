let AlbumModel = require('../models/AlbumModel');
let async = require('async');

module.exports.ListerAlbum = function (request, response) {
    async.parallel([ function (callback) {
        AlbumModel.RecupererPremierePhotoVip(function(err, result) { callback(err, result)})
    }], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        
        response.imagesAside = genererTableauxPhotos(result[0]);

        response.title = 'Album des stars';
        response.render('listerAlbum', response);
    });
};

module.exports.ListerAlbumVip = function(request, response) {
    let idVip = request.params.idVip;
    async.parallel([ function (callback) {
        AlbumModel.RecupererPremierePhotoVip(function(err, result) { callback(err, result)})
    }, function (callback) {
        AlbumModel.RecupererPhotoEtCommentairePourVip(idVip, function (err, result) { callback(err, result)})
    }], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }

        response.imagesAside = genererTableauxPhotos(result[0]);
        response.sectionCommentaire = result[1];
        console.log(response.sectionCommentaire);

        response.title = 'Album des stars';
        response.render('listerAlbumVip', response);
    });
};

let genererTableauxPhotos = function(result) {
    let tableauxPhotos = [];
    let nbTableaux = 0;
    tableauxPhotos.push([]);
    for (let iterator = 0; iterator < result.length; iterator++) {
        if (tableauxPhotos[nbTableaux].length >= 12) {
            tableauxPhotos.push([]);
            nbTableaux++;
        }
        tableauxPhotos[nbTableaux].push(result[iterator]);
    }
    return tableauxPhotos;
};