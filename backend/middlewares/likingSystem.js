//@ts-nocheck
const Sauce = require('../models/Sauce');

/**
 *  Construction du system de Likes
 * 
 */
module.exports = (req, res, next) => {
    let message = "";
    // import de la méthode findOne avec paramètre un objet de comparaison c'est-à-dire que de l'id de l'objet soit le même que le paramètre de requête 
    Sauce.findOne({ _id: req.params.id })
        // Gestion de la promesse
        .then(sauce => {
            // Methode permettant l'ajout de like
            if (req.body.like == 1 && sauce.usersLiked.indexOf(req.body.userId) < 0) {
                sauce.usersLiked.push(req.body.userId);
                sauce.likes += 1;
                message = "Vous aimez la sauce " + sauce.name + "!";
                // methode permettant d'ajouter un dislike
                // renvoie le premier indice pour lequel on trouve un élément donné dans un tableau. Si l'élément cherché n'est pas présent dans le tableau, la méthode renverra -1.
            } else if (req.body.like == -1 && sauce.usersDisliked.indexOf(req.body.userId) < 0) {
                sauce.usersDisliked.push(req.body.userId);
                sauce.dislikes += 1;
                message = "Vous détestez la sauce " + sauce.name + "!";
            } else {
                // methode permetant de retirer le like
                sauce.usersLiked.forEach(element => {
                    if (element == req.body.userId) {
                        sauce.likes -= 1;
                        sauce.usersLiked.pull(req.body.userId);
                    }
                });
                // méthode permettant de retirer le dislike
                sauce.usersDisliked.forEach(element => {
                    if (element == req.body.userId) {
                        sauce.dislikes -= 1;
                        sauce.usersLiked.pull(req.body.userId);
                    }
                });
                // Message au cas d'embarras de like ou de dislike
                message = "Vous n'avez pas de préférence pour la sauce " + sauce.name + "!";
            }
            req.body.sauce = sauce;
            req.body.message = message
            next();
        })

        // erreur serveur 
        .catch(error => res.status(400).json({ error: "Une erreur est survenue lors de l'analyse des données!" }));
}


