let HomeController = require('./../controllers/HomeController');
let ConnexionController = require('./../controllers/Administration/ConnexionController');
let AdministrationVipController = require('./../controllers/Administration/AdministrationVipController');
let AdministrationPhotoController = require('./../controllers/Administration/AdministrationPhotoController');

// Routes
module.exports = function (app) {

    /* Connexion */
    app.get('/', ConnexionController.InterfaceConnexion);
    app.get('/deconnexion', ConnexionController.InterfaceDeconnexion);
    app.post('/verifierConnexion', ConnexionController.VerificationConnexion);

    /* VIPs */
    app.get('/ajouterVip', AdministrationVipController.AjouterVip);
    app.post('/confirmerAjoutVip', AdministrationVipController.ConfirmerAjoutVip);

    app.get('/modifierVip', AdministrationVipController.ModifierVip);
    app.post('/modifierDonneesVip', AdministrationVipController.ModifierDonneesVip);
    app.post('/confirmerDonneesVip', AdministrationVipController.ConfirmerModificationVip);

    app.get('/supprimerVip', AdministrationVipController.SupprimerVip);
    app.post('/confirmerSuppressionVip', AdministrationVipController.ConfirmerSuppressionVip);

    /* Photos */
    app.get('/ajouterPhoto', AdministrationPhotoController.AjouterPhoto);
    app.post('/ajouterPhoto', AdministrationPhotoController.AjouterDonneesPhoto);

    app.get('/supprimerPhoto', AdministrationPhotoController.SelectionPhotoASupprimer);
    app.post('/supprimerPhoto', AdministrationPhotoController.SupprimerPhoto);

    // tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);
};
