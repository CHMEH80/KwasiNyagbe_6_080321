/**
 * plugin npm de Node.js permet de gérer l'upload de fichiers
 */

const multer = require('multer');

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif"
};

/**
 * Const permettant d'enregistrer l'image sur le disk
 */
const storage = multer.diskStorage({
    // indique le dossier dans lequel enregistrer l'image
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    // explique à multer quel nom de fichier utiliser
    filename: (req, file, callback) => {
        // gestion des espaces dans un nom de fichier
        const name = file.originalname.split(".")[0].split(" ").join("_");
        // gestion de l'extension du fichier 
        const extension = MIME_TYPES[file.mimetype];
        // contrôle la bonne extension
        mimeTypeIsValid(extension, req);
        // ajoute timstamp pour rendre l'extension unique
        const finalFilename = name + "_" + Date.now() + "." + extension;
        req.body.finalFileName = finalFilename;
        // création du fichier
        callback(null, finalFilename);
    }
});

// export du middle configuré avec la methode single pour 
// signaler qu'il s'agit d'un fichier unique
module.exports = multer({ storage: storage }).single('image');

// méthode de verification de la bonne extension du fichier
const mimeTypeIsValid = (ext, req) => {
    if (ext != "jpg" && ext != "jpeg" && ext != "png" && ext != "webp" && ext != "gif") {
        req.body.errorMessage = "Le format de l'image n'est pas valide!";
    }
}



