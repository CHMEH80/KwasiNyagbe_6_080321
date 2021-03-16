// plugin nmp Node.js
const express = require('express');
const router = express.Router();
const sauceController = require('../controllers/sauce');

// midlewares avec authentification pour sécuriser les connexions
const auth = require('../middlewares/authentification');

// midlewares pour la gestion des images
const multer = require('../middlewares/multer-configuration');
const likingAllgo = require('../middlewares/likingSystem');
const getOldPicture = require('../middlewares/getOldPictureAfterUpdate');
const checkLike = require('../middlewares/checkUserLiking');        // Désactivez l'option pour éviter d'aimer ou de ne pas aimer nos propres sauces*
const checkCreateForm = require('../middlewares/checkCreateSauceForm');
const deletePictureNoConformForm = require('../middlewares/deletePictureNoConformForm');
// Les différentes fichier de routes et les middlewares
// appliquation des différentes fonctions à la route dédiée
router.post('/', auth, multer, checkCreateForm, sauceController.createSauce, deletePictureNoConformForm);
router.post('/:id/like', auth, likingAllgo, sauceController.likeOneSauce);
// route pour récupérer la liste de toutes les sauces
router.get('/', auth, sauceController.getAllSauces);
// route dynamique pour récupérer une seule sauce
router.get('/:id', auth, sauceController.getOneSauce);
// route pour la gestion des photos, la suppression  et mise à jour des sauces
router.put('/:id', auth, multer, getOldPicture, checkCreateForm, sauceController.modifyOneSauce, deletePictureNoConformForm);
// route pour la suppression des sauces
router.delete('/:id', auth, sauceController.deleteSauce);

// export du rooter de ce fichier
module.exports = router;