let async = require('async');
let ParametresModel = require('../../models/Administration/ParametresModel');
let Cryptr = require('cryptr');

module.exports.InterfaceConnexion = function(request, response) {
    response.render('connexion', response);
};

module.exports.VerificationConnexion = function(request, response) {
    let login = request.body.login;
    let password = request.body.password;
    response.render('connexion', response);
};