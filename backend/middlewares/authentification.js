// Middleware qui vérifie le token envoyé par l'application frontend avec sa requête
//  pour vérifier qu'il s'agit non seulement d'un token valable mais que si
// il y a un userId qui est envoyé avec la requête, que ce userid correspond bien à celui qui est encodé dans le Token  
const jsonWebToken = require('jsonwebtoken');

// Création du Token d'authentification
// gestion de la réception de la requête et la réponse 
// next renvoie à la foncion d'après l'exécution du serveur
module.exports = (req,res,next) => {
// gestion de la moindre erreur
    try { 
// split et retourne un tableau avec bearer et le Token
        const token = req.headers.authorization.split(" ")[1];
// décodage du Token avec la fonction verify  
// prend en argument le Token et la clé secrète     
        const decodedToken = jsonWebToken.verify(token,process.env.SECRET);
        // @ts-ignore
        // si Token décodé ce devient un objet JavaScript et on récupère le userId qui est dedans
        const userId = decodedToken.userId;
        // Verification s'il un userId avec la requête et qu'il correspond bien à celle du Token
        if(req.body.userId&&req.body.userId!==userId) {
        // renvoi l'erreur    
            throw "Non authentifié !";
        } else {
// sinon si tout va bien bien on va appeler next
            next();
        }
    } catch {
// envoi la réponse par la methode json de l'objet réponse 
        res.status(401).json({error: 'Invalid request!'});
    }
}