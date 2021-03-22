// Import de mongoose pour la création du schéma des sauces

const mongoose = require('mongoose');

// @ts-nocheck
// Plugin pour éviter d'avoir plusieurs utilisateurs avec la même adresse mail dans la base de données
const mongooseUniqueValidator = require('mongoose-unique-validator');


/**
 * Fonction shema de mongoose à laquelle on va passer un objet qui contiendra les différents 
 * champs requis que notre schema aura besoin
 */
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: Array, required: true },
    usersDisliked: { type: Array, required: true }
});

sauceSchema.plugin(mongooseUniqueValidator);

/**
 *  export du modèle terminé  et de ses arguments pour puvoir l'utiliser dans la base de données
 */
module.exports = mongoose.model('Sauce', sauceSchema);