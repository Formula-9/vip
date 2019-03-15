let HomeController = require('./../controllers/HomeController');
let ConnexionController = require('./../controllers/Administration/ConnexionController');
let AdministrationVipController = require('./../controllers/Administration/AdministrationVipController');

// Routes
module.exports = function (app) {
    app.get('/', ConnexionController.InterfaceConnexion);
    app.get('', ConnexionController.InterfaceConnexion);

    app.post('/verifierConnexion', ConnexionController.VerificationConnexion);

    app.get('/ajouterVip', AdministrationVipController.AjouterVip);

    // tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);
};
