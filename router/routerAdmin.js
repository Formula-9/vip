let HomeController = require('./../controllers/HomeController');
let ConnexionController = require('./../controllers/Administration/ConnexionController');

// Routes
module.exports = function (app) {
    app.get('/', ConnexionController.InterfaceConnexion);

    // tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);
};
