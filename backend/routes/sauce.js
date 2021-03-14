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

// applique la midleware authentification à toute l'application
router.post('/', auth, multer, checkCreateForm, sauceController.createSauce, deletePictureNoConformForm);
router.post('/:id/like', auth, likingAllgo, sauceController.likeOneSauce);
router.get('/', auth, sauceController.getAllSauces);
router.get('/:id', auth, sauceController.getOneSauce);
router.put('/:id', auth, multer, getOldPicture, checkCreateForm, sauceController.modifyOneSauce, deletePictureNoConformForm);
router.delete('/:id', auth, sauceController.deleteSauce);


module.exports = router;