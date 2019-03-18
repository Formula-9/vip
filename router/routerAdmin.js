let HomeController = require('./../controllers/HomeController');
let ConnexionController = require('./../controllers/Administration/ConnexionController');
let AdministrationVipController = require('./../controllers/Administration/AdministrationVipController');
let AdministrationPhotoController = require('./../controllers/Administration/AdministrationPhotoController');

// Routes
module.exports = function (app) {

    /* VIPS */
    app.get('/', ConnexionController.InterfaceConnexion);
    app.get('', ConnexionController.InterfaceConnexion);
    app.get('/deconnexion', ConnexionController.InterfaceDeconnexion);

    app.post('/verifierConnexion', ConnexionController.VerificationConnexion);

    app.get('/ajouterVip', AdministrationVipController.AjouterVip);

    /* Photos */
    app.get('/ajouterPhoto', AdministrationPhotoController.AjouterPhoto);

    // tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);
};
