let async = require('async');

let ArticleModel = require('../models/ArticleModel');

module.exports.SelectionnerVip = function(request, response) {
    async.parallel([ function(callback) {
        ArticleModel.recupererVipsAvecArticles(function (err, result) { callback(null, result) });
    }], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.listeVips = result[0];
    });
};