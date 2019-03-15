let async = require('async');
let AdministrationVipModel = require('../../models/Administration/AdministrationVipModel');

module.exports.AjouterVip = function(request, response) {
    async.parallel([ function(callback) {
        AdministrationVipModel.recupererNationalitesPourVip(function(err, result) { callback(null, result); })
    }], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(response.locals.session.connecte);
        response.nationalites = result[0];
        response.render('ajouterVip', response);
    });
};

