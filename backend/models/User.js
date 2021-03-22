
/**
 * Système de stockage dans la DB
 * plugin Npm Node.js
 */
const mongoose = require('mongoose');

/**
 * Plugin pour éviter d'avoir plusieurs utilisateurs avec la même adresse mail dans la base de données
 */
const uniqueValidator = require('mongoose-unique-validator');

/**
 * Modèle des utilisateurs
 * Utilisation de la fonction Shema de Mongoose
 * avec propriété adresse email de l'utilisateur qu'on va stocker 
 * un boolean unique pour éviter de s'inscrire plusieurs fois avec la même adresse email
 */
const userSchema = mongoose.Schema({
  // adresse email de l'utilisateur qu'on va stocker unique pour éviter de s'inscrire plusieurs fois avec la même adresse email
  email: { type: String, required: true, unique: true },
  // le hash cryté
  password: { type: String, required: true }
});

// Application du plugin unique validateur en paramètre de Shema avant d'en faire un model
userSchema.plugin(uniqueValidator);

// export sous forme de model
module.exports = mongoose.model('user', userSchema);