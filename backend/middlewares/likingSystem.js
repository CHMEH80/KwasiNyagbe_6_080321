// Construction du system de Likes
const Sauce = require('../models/Sauce');

module.exports = (req,res,next) => {
    let message = "";
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        // @ts-ignore
        if(req.body.like ==1 && sauce.usersLiked.indexOf(req.body.userId)<0) {
            // @ts-ignore
            sauce.usersLiked.push(req.body.userId);
            // @ts-ignore
            sauce.likes+=1;
            // @ts-ignore
            message = "Vous aimez la sauce "+sauce.name+"!";
        // @ts-ignore
        } else if (req.body.like==-1 && sauce.usersDisliked.indexOf(req.body.userId)<0) {
            // @ts-ignore
            sauce.usersDisliked.push(req.body.userId);
            // @ts-ignore
            sauce.dislikes+=1;
            // @ts-ignore
            message = "Vous détestez la sauce "+sauce.name+"!";
        } else {
            // @ts-ignore
            sauce.usersLiked.forEach(element => {
                if(element==req.body.userId) {
                    // @ts-ignore
                    sauce.likes-=1;
                    // @ts-ignore
                    sauce.usersLiked.splice(sauce.usersLiked.indexOf(req.body.userId),1);
                }
            });
            // @ts-ignore
            sauce.usersDisliked.forEach(element => {
                if(element==req.body.userId) {
                    // @ts-ignore
                    sauce.dislikes-=1;
                    // @ts-ignore
                    sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(req.body.userId),1);
                }
            });
            // @ts-ignore
            message = "Vous n'avez pas de préférence pour la sauce "+sauce.name+"!";
        }
        req.body.sauce = sauce;
        req.body.message = message
        next();
    })
    // @ts-ignore
    .catch(error => res.status(400).json({ error: "Une erreur est survenue lors de l'analyse des données!" }));
}


