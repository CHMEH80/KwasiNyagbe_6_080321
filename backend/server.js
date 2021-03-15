// commande permettant l'accès http ==> création d'un serveur
const http = require("http");
const app = require("./app");

const port = 3000;

app.set('port', port);

// méthode creareServer qui prend en paramètres app contenant toutes fonctions qui seront appelés à chaque requête reçu par le serveur
const server = http.createServer(app);

server.listen(port);
server.on('error', errorHandler);
server.on('listening', messageListening);
server.on('request', messageQuandRequete);

// génère un message et la date une fois une requête envoyée 
function messageQuandRequete() {
  let objDate = new Date();
  console.log(`Une requête provenant de l'application a bien été reçue ! 
    (${objDate.getDate()} ${objDate.getMonth() + 1}/${objDate.getFullYear()} à ${objDate.getHours()}: ${objDate.getMinutes()} : ${objDate.getSeconds()})`);

  console.log(`Une requête provenant de l'application a bien été reçue ! ${new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'long' }).format(objDate)}`);
}

// génère un message d'attente lors de la connexion au réseau sur le port
function messageListening(){
  console.log('En attente d\'une communication réseau sur le port ' + port);
}
 // gère les erreurs lors du démarrage du serveur
function errorHandler (error) {
  console.log(error + ": Une erreur est survenue au démarrage du server.");
};
