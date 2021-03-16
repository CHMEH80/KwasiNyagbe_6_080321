// Plugin bcrypt pour hasher le mot de passe; jsonwebtoken pour le token d'authentification )
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/User');

// Enregistrement de nouveaux utilisateurs dans la DB
exports.signup = (req,res,next) => { 
// fonction bcrypt pour Hashage du mot de passe 
// prend en paramètre le mot de passe du corps de la requête qui sera passé par le frontend 
//  10 tours d'exécutin de l'algorithme 
    bcrypt.hash(req.body.password,10)
// récupération du hash du mot de pass
    .then(hash => {
 // enregistrement du hash dans un user qu'on va enregistrer dans la DB
        const user = new User ({
            email: mask(req.body.email),
// enristrement du hash afin de ne pas stocker le mdp en blanc
            password: hash
        });
// enregistre le nouvel utilisateur dans la DB et gestion d'erreur
        user.save()
        .then(() => res.status(201).json({message: "Votre compte a bien été enregistré!"}))
        .catch(error => res.status(400).json({message:error}));
    })
// erreur serveur et son message
    .catch(error => res.status(500).json({message:error}));
};

// Pour connecter des utilisateurs existants
exports.login = (req,res,next) => {

// permet de trouver un seul utilisateur dans la DB
// prend en paramètres l'objet de comparaison et on veut que ce soit l'utilisateur pour qui l'adresse mail correspond à celle envoyée dans la requête 
    User.findOne({email:mask(req.body.email)})
// finOne est une fonction asynchrone
    .then(user => {
// Vérification Si on a un utilisateur 
        if(!user) {
// retourne un satatut 401 et notre un message d'erreur
            return res.status(401).json({message:"Cette adresse email n'existe pas!"})
        }
// comparaison du mot de passe envoyé par l'utilisateur qui essaye de se connecter avec le hash qui est enregistré avec le l'utilisateur reçu dans le then
        bcrypt.compare(req.body.password, user.password)
       
// fonction asynchrone qui envoie un boulean
        .then(valid => {
// savoir si la comparaison est valable ou non
            if(!valid) {
// si pas bonne retourne une erreur 401 
                return res.status(401).json({message:"Le mot de passe est incorrect!"})
            }
// si la comparaison est bonne c'est que l'utilisateur a renseigné des identifiants bonne  200 ressources Ok
            return res.status(200).json({
//  et on va lui renvoyer son user Id qui est attendu par le frontend
                userId: user._id,
// et un token  qui est une chaine de caractère avec un délai d'expiration             
// appelle une fonction sign de de JsonWebToken et prend en arguments
//  le payload (les données encodées à l'intérieur de ce Token);              
token: jsonWebToken.sign(
// correspond à l'id utilisateur du user pour être sûr que cette requette 
// correspond bien à ce user id          
    { userId: user._id },
// ensuite la clé secrète pour l'encodage 
                    process.env.SECRET,
// et une expiration de 1h chaque Token                       
                    { expiresIn: '1h' }
                )
            });
        })
        // erreur serveur
        .catch(error => res.status(500).json({message:"Une erreur est survenue: "+error}));
    })
    // erreur serveur
    .catch(error => res.status(500).json({message:"Cette adresse est introuvable en base de données: "+error}));  
};


/**
 * [mask description]
 *
 * @param   {String}  email   [email description]
 * @param   {Boolean}  reveal  [reveal description]
 *
 * @return  {String}          [return description]
 */
 function mask(email, reveal=false){
  let code;
  let newMail = "";
  let arobase = false;
  for(let i=0, size = email.length; i<size; i++){
    if (email[i] === "@"){
      arobase = true;
      newMail +="@";
      continue;
    }
    if (arobase && email[i] === "."){
      newMail += email.slice(i);
      break;
    }
    if (reveal) code = email.charCodeAt(i) +800;
    else code = email.charCodeAt(i) -800;
    newMail += String.fromCharCode(code);
  }
  return newMail;
}

function unmask(email){
  return mask(email,true)
}

// console.log(mask("kwasi@gmail.com"))
// console.log(unmask("﵋ﵗ﵁ﵓ﵉@﵇﵍﵁﵉﵌.com"))