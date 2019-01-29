let RepertoireModel = require('../models/RepertoireModel');

// ///////////////////////// R E P E R T O I R E    D E S     S T A R S

module.exports.Repertoire = function (request, response) {
    response.title = 'Répertoire des stars';
    RepertoireModel.recupererLettres(function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.tableLettres = result;
        response.render('repertoireVips', response);
    });
};
