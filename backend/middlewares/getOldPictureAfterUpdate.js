// @ts-nocheck
const Sauce = require('../models/Sauce');

/**
 * Evite d'avoir une image déjà utilisée
 * 
 */
module.exports = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            req.body.oldPictureName = sauce.imageUrl.split("/images/")[1];
            next();
        })
        .catch(error => res.status(500).json({ message: error }));
}

