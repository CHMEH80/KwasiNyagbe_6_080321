
// Import de différents Plugins Npm Node.js
// package express pour lancer le serveur
const express = require('express');
// @ts-ignore
// pour lutter contre les attaque de type déni de service distribué ddos
const Ddos = require('ddos');
const ddos = new Ddos({ burst: 10, limit: 15 })

// protéger l’application de certaines des vulnérabilités web
const helmet = require("helmet");

// base de donées à laquelle l'Api est liée pour la rendre totalement dynamique
const mongoose = require('mongoose');

// accès de notre système de chemin de fichier images
const path = require('path');

// Gestion du monitoring
const morgan = require('morgan');

// @ts-ignore
// Gestion du monitoring
const winston = require('./monitoring/configuration/winston');

// fonction definie sur true pour la construction d'index par défaut de Mongoose
mongoose.set('useCreateIndex', true);



// Connection à la base de donnée Mongoose
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Routes 
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Utilisation du Framework Express
const app = express();

app.use(ddos.express);

// Middleware pour les headers de requêtes et éviter les erreurs CORS (une sécurité qui empêche les reqêtes mailleveilantes)
// Ces middlewares seront appliqués à toutes les routes de l'application

// @ts-ignore
app.use(morgan('combined', { stream: winston.stream }));
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
// Urls des routes auquelless l'aplication front fera appel
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

// export de la constante app pour accès depuis les autres fichiers
module.exports = app;