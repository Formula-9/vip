let async = require('async');

let ArticleModel = require('../models/ArticleModel');
let VipModel = require('../models/VipModel');

module.exports.SelectionnerVip = function(request, response) {
    async.parallel([ function(callback) {
        ArticleModel.recupererVipsAvecArticles(function (err, result) { callback(null, result) });
    }], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.listeVips = result[0];
        response.render('articlesSelectionnerVip', response);
    });
};

module.exports.SelectionnerArticlesVip = function(request, response) {
    let idVip = request.params.idVip;
    async.parallel([ function(callback) {
        ArticleModel.recupererVipsAvecArticles(function (err, result) { callback(null, result) });
    }, function(callback) {
        ArticleModel.recupererArticlesVip(idVip, function (err, result) { callback(null, result) });
    }, function (callback) {
        VipModel.recupererNomEtPrenomVip(idVip, function (err, result) { callback(null, result) })
    }], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.listeVips = result[0];
        response.articles = result[1];
        response.nomPrenomVip = result[2][0].vipPrenom + " " + result[2][0].vipNom;
        response.idVip = idVip;
        response.render('articlesVip', response);
    });
};