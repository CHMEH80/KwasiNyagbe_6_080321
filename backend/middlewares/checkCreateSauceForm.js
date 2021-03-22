// @ts-nocheck
// Contrôle regex pour la création d'une sauce

const controleRegex = [/^[\wéèàêûçàôë]{2}[\w\s-'éèàêûñçàôë]{0,48}$/i,
  /^[\wéèàêûçàôë]{2}[\w\s-'éèàêûçñàôë]{0,40}$/i,
  /^[\wéèàêûçàôë]{2}[\w\s-éèàêûçàñôë,?;.!:/"'()]{0,1098}$/i,
  /^[a-zA-Zéèàêûçàôë]{2}[a-zA-Z\s-'éèàêñûçàôë]{0,48}$/i,
  /^([1-9]|10)$/];

/**
 * 
 * Contrôle de la cohérence des données saisies
 */
module.exports = (req, res, next) => {
  let compteur = 0;
  if (req.body.sauce) {
    sauceObjet = JSON.parse(req.body.sauce);
  } else {
    sauceObjet = { ...req.body };
  }
  for (const key in sauceObjet) {
    // la methode détermine si l'objet suceObjet contient une propriété key 
    if (sauceObjet.hasOwnProperty(key) && compteur < 5) {
      // test vérifie s'il y a une correspondance entre un texte et une expression rationnelle.    
      if (!controleRegex[compteur].test(sauceObjet[key])) {
        // génère le message suivant      
        req.body.errorMessage = "Le champ " + key + " ne semble pas valide !";
        next();
      }
    }
    compteur++;
  }
  next();
}