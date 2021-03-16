
// Import de différents Plugins Npm Node.js
// package express pour lancer le serveur
const express = require('express');

// base de donées à laquelle l'Api est liée pour la rendre totalement dynamique
const ddos        = require('ddos')({burst:10, limit:15});
const helmet      = require("helmet");
const mongoose    = require('mongoose');
const path        = require('path');
mongoose.set('useCreateIndex', true);



// Connection à la base de donnée Mongoose
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// const Sauce = require('./models/Sauce');
// const User = require('./models/User');

// Routes 
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Utilisation du Framework Express
const app = express();

app.use(ddos.express);

// Middleware pour les headers de requêtes et éviter les erreurs CORS (une sécurité qui empêche les reqêtes mailleveilantes)
// Ces middlewares seront appliqués à toutes les routes de l'application

app.use(helmet());

app.use((req, res, next) => {
// rajout des headers pour permettre que tous les utilisateur depuis n'importe quel navigateur puissent faire les requêtes nécessaires pour accéder à notre api  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
// accorde l'utilisation de certains métodes     
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
// passe l'exécution à la fonction suivante
    next();
});

// Traitement des sonnées par BodyParser pour donner accès au corps de la requête
app.use(express.json());
// Chemin virtuel pour les fichiers statiques tel que nos images
app.use('/images', express.static(path.join(__dirname, 'images')));
// Url des routes auquels l'aplication front fera appel
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

// export de la constante app pour accès depuis les autre fichiers
module.exports = app;