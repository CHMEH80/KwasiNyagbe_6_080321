// const http = require("http");
const app = require("./app");

const port = 3000;

app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', errorHandler);
server.on('listening', messageListening);
server.on('request', messageQuandRequete);


function messageQuandRequete() {
  let objDate = new Date();
  console.log(`Une requête provenant de l'application a bien été reçue ! 
    (${objDate.getDate()} ${objDate.getMonth() + 1}/${objDate.getFullYear()} à ${objDate.getHours()}: ${objDate.getMinutes()} : ${objDate.getSeconds()})`);

  console.log(`Une requête provenant de l'application a bien été reçue ! ${new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'long' }).format(objDate)}`);
}

function messageListening(){
  console.log('En attente d\'une communication réseau sur le port ' + port);
}

function errorHandler (error) {
  console.log(error + ": Une erreur est survenue au démarrage du server.");
};

// const http = require('http');
// const app = require('./app');

// const port = 3000;

// app.set('port', port);

// const errorHandler = error => {
//     console.log(error+": Une erreur est survenue au démarrage du server.");
// };

// const server = http.createServer(app);

// server.on('error', errorHandler);
// server.on('listening', () => {
//     console.log('En attente d\'une communication réseau sur le port '+port);
// });
// server.on('request', () => {
//     let objDate = new Date();
//     console.log("Une requête provenant de l'application a bien été reçue ! ("
//     +objDate.getDate()+"/"+(objDate.getMonth()+1)+"/"+objDate.getFullYear()+" à "
//     +objDate.getHours()+":"+objDate.getMinutes()+":"+objDate.getSeconds()+")");
// });

// server.listen(port);