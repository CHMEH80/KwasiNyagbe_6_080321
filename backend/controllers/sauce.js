
// import du modèle Sauce
const Sauce = require('../models/Sauce');

// package pour la suppression
const fs = require('fs');

// Création d'une nouvelle sauce
exports.createSauce = (req,res,next) => {
    const sauceObjet = JSON.parse(req.body.sauce);
// supprime le champs id du corps de la requête qui ne sera pas le bon car généré automatiquement par la DB 
    delete sauceObjet._id;
    const sauce = new Sauce({
// reccourci Js qui va copier les champs dans la request du body et va le détailler  
        ...sauceObjet,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    if(!req.body.errorMessage) {
       // enregistre le nouvel objet ==>la nouvelle sauce dans la DB
        sauce.save()
        .then(() => { 
    
        // ensuite renvoie un code 201 pour une bonne création de la sauce
            res.status(201).json({ message: 'La sauce a été créée avec succès!' }); 
        })
        // récupère l'erreur et renvoi un message 
        .catch(error => { 
            if(error.message.indexOf("to be unique")>0) {
                req.body.errorMessage = "Le nom de cette sauce existe déjà!";
            }
            next();
        })
    } else {
        next();
    }
};

// Récupération de toutes les sauces crées
exports.getAllSauces = (req,res,next) => {
    
 // utilisation de la méthode find pour récupéré la liste des sauces  
    Sauce.find()
 // retourne une promesse avec le tableau des sauces depuis la DB  
    .then(sauces => {
 // renvoi une réponse avec le code 200 avec le tableau des sauces reçues depuis la DB      
        res.status(200).json(sauces);
    })
// envoie une erreur 400 avec l'objet erreur
    .catch(error => {
        res.status(400).json({ message: error });
    });
};

// Récupération d'une seule sauce dans la DB
exports.getOneSauce = (req, res, next) => {
 // méthode findOne avec paramètre un objet de comparaison c'est-à-dire que de l'id de l'objet soit le même que le paramètre de requête
    Sauce.findOne({_id: req.params.id})
 // une promise avec si retrouvé dans la DB   
    .then(sauce => {
 // retourne un réponse avec la sauce dedans
        res.status(200).json(sauce);
    })
    // et si erreur code 404 avec l'objet error
    .catch( error => {
        res.status(404).json({ error: error });
    });
};

// Modification de la sauce
exports.modifyOneSauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    if(!req.body.errorMessage) {
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => {
            if(!req.file) {
                res.status(200).json({ message: "La sauce a bien été modifiée!"})
            } else {
                next();
            }
        })
        .catch(error => { 
            if(error.message.indexOf("duplicate key")>0) {
                req.body.errorMessage = "Le nom de cette sauce existe déjà!";
            }
            next();
        })
    } else {
        next();
    }
};

// suppression de la sauce
exports.deleteSauce = (req, res, next) => {
    // avec comme paramètre l'identifiant qui va renvoyer l'i de l'objet 
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'La sauce a bien été supprimée !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
};

// Implémentation de Like et dislike des sauces
exports.likeOneSauce = (req, res, next) => {
    const sauceObjet = req.body.sauce;
    Sauce.updateOne({ _id: req.params.id },{$set: {
        likes: sauceObjet.likes,
        dislikes: sauceObjet.dislikes,
        usersDisliked: sauceObjet.usersDisliked,
        usersLiked: sauceObjet.usersLiked },
        _id: req.params.id
    })
    .then(() => res.status(200).json({ message: req.body.message}))
    .catch(error => res.status(400).json({ error: req.body.message }));
};