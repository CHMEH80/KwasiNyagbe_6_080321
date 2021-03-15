// Plugin npm de Node.js
const jsonWebToken = require('jsonwebtoken');

// Création du Token d'authentification
// gestion de la réception de la requête et la réponse 
// next renvoie à la foncion d'après l'exécution du serveur
module.exports = (req,res,next) => {
    try { 
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jsonWebToken.verify(token,'RANDOM_TOKEN_SECRET');
        // @ts-ignore
        const userId = decodedToken.userId;
        if(req.body.userId&&req.body.userId!==userId) {
            throw "Non authentifié !";
        } else {
// renvoie la réponse pour que la reqête se termine            
            next();
        }
    } catch {
// envoi la réponse par la methode json de l'objet réponse 
        res.status(401).json({error: 'Invalid request!'});
    }
}