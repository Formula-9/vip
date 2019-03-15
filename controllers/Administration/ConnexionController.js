let async = require('async');
let ParametresModel = require('../../models/Administration/ParametresModel');
let Cryptr = require('cryptr');
let cryptr = new Cryptr('MaSuperCléDeChiffrementDeouF');

module.exports.InterfaceConnexion = function(request, response) {
    response.render('connexion', response);
};

module.exports.VerificationConnexion = function(request, response) {
    let login = request.body.login;
    let password = request.body.password;

    async.parallel([ function(callback) {
        ParametresModel.recupererMotDePasseCryptePourLogin(login, function (err, result) { callback(null, result) });
    }], function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        let storedPassword = cryptr.decrypt(result[0][0]['p']);
        let loginOk = storedPassword === password;
        response.locals.session.connecte = loginOk;
        response.loginOk = loginOk;
        response.render('verifierConnexion', response);
    });
};